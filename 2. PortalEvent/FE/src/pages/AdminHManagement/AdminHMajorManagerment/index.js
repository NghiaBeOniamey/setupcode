import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Table, Tag
} from "antd";
import {AdminHMajorManagermentApi} from "./AdminHMajorManagermentApi";
import Title from "antd/es/typography/Title";
import {FileExcelOutlined, FilterOutlined, LoadingOutlined, SyncOutlined} from "@ant-design/icons";
import ShowHistoryModal from "../../../components/ShowHistoryModal";
import {ADMIN_MAJOR_MANAGEMENT} from "../../../constants/DisplayName";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";

export default function AdminHMajorManagerment() {
    const [listMajor, setListMajor] = useState([]); //DS bộ môn
    const [filter, setFilter] = useState({}); // params bộ lọc
    const [currentPage, setCurrentPage] = useState(1); // trang hiện tại

    useEffect(() => {
        loadMajor(filter);
    }, [filter]);

    const loadMajor = (data) => {
        AdminHMajorManagermentApi.fetchAll(data)
            .then((response) => {
                setListMajor(response.data);
            })
            .catch((e) => {
                ////  //console.log(e);
            });
    };

    const handleFilter = (data) => {
        loadMajor(data);
        setFilter(data);
    };

    const handleMajorFetch = () => {
    AdminHMajorManagermentApi.fetchMajors()
        .then(() => {
            loadMajor(filter);
        })
        .catch((e) => {
            //console.log(e);
        });
}

    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Mã bộ môn",
            dataIndex: "code",
            key: "code",
            render: (mainMajorCode, record) => (
                <Tag color={record.mainMajorCode && "magenta" || "cyan"}>
                    {
                        (
                            record.mainMajorCode &&
                            `${record.mainMajorCode} - ${mainMajorCode}`
                        ) || mainMajorCode
                    }
                </Tag>
            ),
        },
        {
            title: "Tên bộ môn",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email chủ nhiệm bộ môn / trưởng môn",
            dataIndex: "mailOfManager",
            key: "mail"
        }
    ];

    return (
        <>
            <div
                style={{
                    backgroundColor: "#FFF",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                }}
            >
                <Title level={5}>
                    <FilterOutlined/> Bộ lọc
                </Title>
                <Form onFinish={handleFilter}>
                    <Row gutter={12} style={{marginBottom: "10px"}}>
                        <Col flex="1 1 200px">
                            <Form.Item name={"value"}>
                                <Input placeholder="Tìm kiếm bộ môn theo mã, tên, email trưởng bộ môn..."/>
                            </Form.Item>
                        </Col>
                        <Col flex="0 1 ">
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<FilterOutlined/>}
                            >
                                Lọc
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div
                style={{
                    backgroundColor: "#FFF",
                    padding: "10px",
                    borderRadius: "10px",
                }}
            >
                <ShowHistoryModal displayName={ADMIN_MAJOR_MANAGEMENT}/>
                {/* <Button type='primary' style={{backgroundColor: "green", marginRight: 5}}
                        onClick={handleMajorFetch}><SyncOutlined spin/> Đồng bộ dữ liệu</Button> */}
                <Table
                    style={{marginTop: "10px"}}
                    dataSource={listMajor}
                    columns={columns}
                    pagination={{
                        current: currentPage,
                        pageSize: 5,
                        total: listMajor.length,
                        onChange: (page) => {
                            setCurrentPage(page);
                            loadMajor(filter);
                        },
                    }}
                    scroll={{
                        x: 1300,
                    }}
                />
            </div>
        </>
    );
}
