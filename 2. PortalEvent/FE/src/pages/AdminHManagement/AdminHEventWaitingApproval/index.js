import { FileExcelOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Table, Tooltip, } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import ExportCSV from './ExportExcel';
import { faEye, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import APStatisticsEventApi from "../APStatisticsEvent/APStatisticsEventApi";
import { AdminHEventWaitingApprovalApi } from './AdminHRegistrationListApi';
import "./index.css";

const { Option } = Select;

export default function EventWaitingApproval() {
    let [listCategory, setListCategory] = useState([]);
    let [listEventApproved, setListEventApproved] = useState([]);
    let [name, setName] = useState("");
    let [formality, setFormality] = useState("");
    let [status, setStatus] = useState([]);
    let [startTime, setStartTime] = useState();
    let [endTime, setEndTime] = useState();
    let [idCategory, setIdCategory] = useState([]);
    const [departmentId, setDepartmentId] = useState([]);
    let [idEventMajor, setIdEventMajor] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setToTalPages] = useState(0);
    let [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
    let [dataSource, setDataSource] = useState([]);
    let { RangePicker } = DatePicker;

    const [isModalOpenParticipants, setIsModalOpenParticipants] = useState(false);
    const [isModalOpenParticipantsLecturer, setIsModalOpenParticipantsLecturer] = useState(false);
    const [isModalOpenEvent, setIsModalOpenEvent] = useState(false);
    const [parentMajorListParticipants, setParentMajorListParticipants] = useState([]);
    const [parentMajorListParticipantsLecturer, setParentMajorListParticipantsLecturer] = useState([]);
    const [major, setMajor] = useState({});
    const [selectedMajorParticipants, setSelectedMajorParticipants] = useState(null);
    const [selectedMajorParticipantsLecturer, setSelectedMajorParticipantsLecturer] = useState(null);

    const [idSemester, setIdSemester] = useState("");
    const [idDepartment, setIdDepartment] = useState("");

    const [listSemester, setListSemester] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);

    useEffect(() => {
        loadDepartment();
        loadCategory();
        getAllSemester();
        getAllMajor();
    }, []);

    const getAllSemester = () => {
        APStatisticsEventApi.getAllSemester().then(
            (res) => {
                setListSemester(res.data.data);
                // // Lấy ngày hiện tại cho lần chạy đầu tiên
                // const now = new Date().getTime();
                // const currentSemesters = res.data.data.find(
                //     (semester) => semester.startTime <= now && semester.endTime >= now
                // );
                // if (currentSemesters !== undefined) {
                //     setIdSemester(currentSemesters.id);
                // }
            }
        );
    }

    const getAllMajor = () => {
        APStatisticsEventApi.getAllMajor().then(
            (res) => {
                setListDepartment(res.data.data);
            },
            (err) => {
                //  //console.log(err);
            }
        );
    }

    const handleOkEvent = () => {
        AdminHEventWaitingApprovalApi.handleExportEvent(idSemester, idDepartment);
        setIsModalOpenEvent(false);
        handResetForm();
    };

    const handleCancelEvent = () => {
        setIsModalOpenEvent(false);
        handResetForm();
    };

    const handResetForm = () => {
        setIdSemester("");
        setIdDepartment("");
    }

    const showModalEvent = () => {
        setIsModalOpenEvent(true);
    };

    const handleOkParticipants = () => {
        AdminHEventWaitingApprovalApi.handleExportParticipants(selectedMajorParticipants);
        setIsModalOpenParticipants(false);
    };

    const handleCancelParticipants = () => {
        setIsModalOpenParticipants(false);
    };

    const handleOkParticipantsLecturer = () => {
        AdminHEventWaitingApprovalApi.handleExportParticipantsLecturer(selectedMajorParticipantsLecturer);
        setIsModalOpenParticipantsLecturer(false);
    };

    const handleCancelParticipantsLecturer = () => {
        setIsModalOpenParticipantsLecturer(false);
    };

    const loadCategory = () => {
        AdminHEventWaitingApprovalApi.fetchListCategory()
            .then((response) => {
                setListCategory(response.data.data);
            })
            .catch((error) => {
            });
    };

    const loadDepartment = async () => {
        try {
            const response = await AdminHEventWaitingApprovalApi.fetchListEventDepartment();
            setListDepartment(response.data.data);
        } catch (e) {
            //err
        }

    }

    useEffect(() => {
        searchOrBtn();
    }, [currentPage]);

    const searchOrBtn = () => {
        let isSearched = false;

        if (name === "" || idCategory || idEventMajor || startTime || endTime) {
            isSearched = true;
        }

        if (isSearched) {
            handleSearch();
        } else {
            loadListEvent();
        }
    }

    const loadListEvent = () => {
        AdminHEventWaitingApprovalApi.fetchListEventWaiting({
            page: currentPage - 1,
            size: 5,
            name: null,
            eventGroup: null,
            categoryId: null,
            startTime: null,
            endTime: null,
            formality: null,
            status: "0,2,3,4,5,6"
        })
            .then((response) => {
                setListEventApproved(response.data.data);
                setCurrentPage(response.data.currentPage + 1);
                setToTalPages(response.data.totalPages);
            })
            .catch((error) => {
                //console.log(error.message);
            });
    };


    const handleSearch = () => {
        let startDate = new Date(startTime).getTime();
        let endDate = new Date(endTime).getTime();
        AdminHEventWaitingApprovalApi.fetchListEventWaiting({
            page: currentPage - 1,
            size: 5,
            name: name,
            majorId: Array.isArray(idEventMajor)
                ? idEventMajor.length === 0
                    ? null
                    : idEventMajor.join(",")
                : null,
            categoryId: Array.isArray(idCategory)
                ? idCategory.length === 0
                    ? null
                    : idCategory.join(",")
                : null,
            departmentId: Array.isArray(departmentId)
                ? departmentId.length === 0
                    ? null
                    : departmentId.join(",")
                : null,
            startTime: startDate === 0 ? null : startDate,
            endTime: endDate === 0 ? null : endDate,
            formality: formality === "null" ? null : formality,
            status: Array.isArray(status)
                ? status.length === 0
                    ? "0,2,3,4,5,6" : status.join(",")
                : null,
        })
            .then((response) => {
                setListEventApproved(response.data.data);
                setCurrentPage(response.data.currentPage + 1);
                setToTalPages(response.data.totalPages);
            })
            .catch((error) => {
            });
    };

    const [form] = Form.useForm();
    const handleResetForm = () => {
        form.resetFields();
        setName(null);
        setFormality(null);
        setStatus([]);
        setStartTime(null);
        setEndTime(null);
    };

    const renderStatus = (status) => {
        return status === "0"
            ? "Đã đóng"
            : status === "1"
                ? "Dự kiến tổ chức"
                : status === "2"
                    ? "Cần sửa"
                    : status === "3"
                        ? "Chờ phê duyệt"
                        : status === "4"
                            ? "Đã phê duyệt"
                            : status === "5"
                                ? "Đã tổ chức"
                                : status === "6"
                                    ? "Đã được bộ môn thông qua" : "";
    };

    const renderDateTime = (startTime) => {
        const momentObject = moment(startTime);
        const formattedDateTime = momentObject.format("HH:mm DD/MM/YYYY");
        return formattedDateTime;
    };

    const renderAction = (record) => (
        <div class="textCenter">
            <Tooltip title="Xem chi tiết" placement="top">
                <Link to={`/admin-h-management/event-detail/${record.id}`}>
                    <Button size={"middle"} shape={"circle"} type="primary"><FontAwesomeIcon icon={faEye} /></Button>
                </Link>
            </Tooltip>
        </div>
    );

    const columnsEvent = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên sự kiện",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startTime",
            key: "startTime",
            render: renderDateTime,
        },
        {
            title: "Ngày kết thúc",
            key: "endTime",
            dataIndex: "endTime",
            render: renderDateTime,
        },
        {
            title: "Danh mục",
            key: "nameCategory",
            dataIndex: "nameCategory",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: renderStatus,
        },
        {
            title: "Thao tác",
            key: "action",
            width: 90,
            render: renderAction,
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-md w-full bg-white p-8">
                <div style={{ marginTop: 5 }}>
                    <Card
                        title={
                            <span>
                                <FontAwesomeIcon icon={faFilter} style={{ marginRight: "8px" }} />
                                Bộ lọc
                            </span>
                        }
                        bordered={false}
                    >
                        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} form={form}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item className="formItem" label="Tên sự kiện" name="name">
                                        <Input
                                            placeholder="Nhập tên sự kiện ..."
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        className="formItem"
                                        label="Danh mục sự kiện"
                                        name="categoryName"
                                    >
                                        <Select
                                            mode="multiple"
                                            value={idCategory}
                                            onChange={(e) => {
                                                setIdCategory(e);
                                            }}
                                            placeholder="Chọn danh mục sự kiện ..."
                                            showSearch
                                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            options={listCategory?.map((item) => ({
                                                value: item.id,
                                                label: item.name
                                            }))}
                                        />
                                        {/* {listCategory.map((category, index) => (
                                                <Option key={index} value={category.id}>
                                                    {category.name}
                                                </Option>
                                            ))} */}
                                        {/* </Select> */}
                                    </Form.Item>
                                    <Form.Item
                                        className="formItem"
                                        label="Danh sách bộ môn"
                                        name="departmentName"
                                    >
                                        <Select
                                            mode="multiple"
                                            value={departmentId}
                                            onChange={(e) => {
                                                setDepartmentId(e);
                                            }}
                                            placeholder="Chọn danh sách bộ môn ..."
                                            maxTagCount="responsive"
                                            showSearch
                                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            options={listDepartment?.map((item) => ({
                                                value: item.id,
                                                label: item.name
                                            }))}
                                        />
                                        {/* //     {listDepartment.map((item, index) => (
                                        //         <Option key={index} value={item.id}>
                                        //             {item.name}
                                        //         </Option>
                                        //     ))}
                                        // </Select> */}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        className="formItem"
                                        label="Trạng thái phê duyệt"
                                        name="approvalStatus"
                                    >
                                        <Select
                                            mode="multiple"
                                            showSearch
                                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            value={status}
                                            onChange={(e) => {
                                                setStatus(e);
                                            }}
                                            placeholder="Chọn trạng thái ..."
                                            options={[
                                                {
                                                    value: "0",
                                                    label: "Đã đóng",
                                                }, {
                                                    value: "2",
                                                    label: "Cần sửa",
                                                }, {
                                                    value: "3",
                                                    label: "Chờ phê duyệt",
                                                }, {
                                                    value: "6",
                                                    label: "Đã được bộ môn thông qua",
                                                }, {
                                                    value: "4",
                                                    label: "Đã phê duyệt",
                                                }, {
                                                    value: "5",
                                                    label: "Đã tổ chức",
                                                }
                                            ]}
                                        />
                                        {/* <Option key="0" value="0">
                                                Đã đóng
                                            </Option>
                                            <Option key="2" value="2">
                                                Cần sửa
                                            </Option>
                                            <Option key="3" value="3">
                                                Chờ phê duyệt
                                            </Option>
                                            <Option key="4" value="4">
                                                Đã phê duyệt
                                            </Option>
                                            <Option key="5" value="5">
                                                Đã tổ chức
                                            </Option> */}
                                        {/* </Select> */}
                                    </Form.Item>

                                    <Form.Item
                                        label="Thời gian sự kiện"
                                        rules={[{ required: true }]}
                                    >
                                        <RangePicker
                                            showTime={{
                                                format: "HH:mm",
                                            }}
                                            style={{
                                                width: "100%"
                                            }}
                                            format="YYYY-MM-DD HH:mm"
                                            value={[startTime, endTime]}
                                            onChange={(e) => {
                                                if (e && e.length === 2) {
                                                    setStartTime(e[0]);
                                                    setEndTime(e[1]);
                                                } else {
                                                    setStartTime(null);
                                                    setEndTime(null);
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>

                            <Form.Item
                                wrapperCol={{
                                    offset: 9,
                                    span: 15,
                                }}
                                style={{ margin: 0 }}
                            >
                                <Button
                                    type="primary"
                                    style={{ margin: 5 }}
                                    htmlType="submit"
                                    onClick={() => handleSearch()}
                                    icon={<SearchOutlined fontSize="20px" />}
                                >
                                    Tìm kiếm
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleResetForm()}
                                    htmlType="button"
                                    icon={<UndoOutlined />}
                                >
                                    Làm mới bộ lọc
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>

                <div style={{ marginTop: 20 }}>
                    <Card
                        title="Danh sách sự kiện"
                        // extra={<ExportCSV csvData={listEventApproved} fileName="sample_data" />}
                        extra={<>
                            {/*<Button type='primary' style={{ backgroundColor: "#1E6E43", marginRight: 5 }}*/}
                            {/*    onClick={showModalParticipants}><FileExcelOutlined /> Danh sách sinh viên</Button>*/}
                            {/*<Button type='primary' style={{ backgroundColor: "#1E6E43", marginRight: 5 }}*/}
                            {/*    onClick={showModalParticipantsLecturer}><FileExcelOutlined /> Danh sách giảng viên</Button>*/}
                            <Button type='primary' style={{ backgroundColor: "#1E6E43" }}
                                onClick={showModalEvent}><FileExcelOutlined /> Danh sách sự kiện</Button>
                        </>}
                        bordered={false}
                    >
                        <Table
                            columns={columnsEvent}
                            dataSource={listEventApproved}
                            rowKey="index"
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: pageSize * totalPages,
                                onChange: (current, pageSize) => {
                                    setCurrentPage(current);
                                    setPageSize(pageSize);
                                },
                            }}
                        />
                    </Card>
                </div>
            </div>
            <Modal
                title={"Export danh sách sinh viên"}
                open={isModalOpenParticipants}
                onOk={handleOkParticipants}
                onCancel={handleCancelParticipants}
            >
                <hr />
                <br />
                {/*<Button onClick={() => ADEventApprovedApi.handleExportEvent()}>Export Excel</Button>*/}
                <Form.Item name={"mainMajor"} label={"Bộ môn"}>
                    <Select
                        className="me-2"
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        defaultValue={parentMajorListParticipants.filter(item => item.code === major?.mainMajorCode).id}
                        onChange={(value) => {
                            setSelectedMajorParticipants(value);
                        }}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={parentMajorListParticipants?.map((item) => ({
                            value: item.code,
                            label: item.name
                        }))}
                    // {parentMajorListParticipants?.map((item) => (
                    //     <Option key={item.id} value={item.code}>
                    //         {item.name}
                    //     </Option>
                    // ))}
                    />
                    {/*<Option value="">-- Chọn bộ môn --</Option>*/}
                </Form.Item>
            </Modal>
            <Modal
                title={"Export danh sách giảng viên"}
                open={isModalOpenParticipantsLecturer}
                onOk={handleOkParticipantsLecturer}
                onCancel={handleCancelParticipantsLecturer}
            >
                <hr />
                <br />
                {/*<Button onClick={() => ADEventApprovedApi.handleExportEvent()}>Export Excel</Button>*/}
                <Form.Item name={"mainMajor"} label={"Bộ môn"}>
                    <Select
                        className="me-2"
                        showSearch
                        optionFilterProp="children"
                        style={{ width: '100%' }}
                        defaultValue={parentMajorListParticipantsLecturer.filter(item => item.code === major?.mainMajorCode).id}
                        onChange={(value) => {
                            setSelectedMajorParticipantsLecturer(value);
                        }}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={parentMajorListParticipantsLecturer?.map((item) => ({
                            value: item.code,
                            label: item.name
                        }))}
                    >
                        {/* <Option value="">-- Chọn bộ môn --</Option>
                        {parentMajorListParticipantsLecturer.map((item) => (
                            <Option key={item.id} value={item.code}>
                                {item.name}
                            </Option>
                        ))} */}
                    </Select>
                </Form.Item>
            </Modal>
            <Modal
                title={"Export danh sách sự kiện"}
                open={isModalOpenEvent}
                onOk={handleOkEvent}
                onCancel={handleCancelEvent}
            >
                <hr />
                <br />
                <Form.Item label="Học kỳ" direction="vertical">
                    <Select
                        mode="single"
                        showSearch
                        style={{ width: "100%" }}
                        options={listSemester.map((semester) => ({
                            value: semester.id,
                            label:
                                semester.name +
                                " (" +
                                dayjs(semester.startTime).format("DD/MM/YYYY") +
                                " - " +
                                dayjs(semester.endTime).format("DD/MM/YYYY") +
                                ")",
                        }))}
                        value={idSemester}
                        onChange={(value) => setIdSemester(value)}
                        placeholder="Select Item..."
                        maxTagCount="responsive"
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>
                <Form.Item label="Bộ môn" direction="vertical">
                    <Select
                        mode="single"
                        style={{ width: "100%" }}
                        options={listDepartment.map((department) => ({
                            value: department.id,
                            label: department.name
                        }))}
                        value={idDepartment}
                        onChange={(value) => setIdDepartment(value)}
                        placeholder="Select Item..."
                        maxTagCount="responsive"
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>
            </Modal>
        </>
    );
}
