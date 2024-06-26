import React from "react";
import {Button} from "antd";
import {faFileExcel} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AdminHRegistrationListApi} from "./AdminHRegistrationListApi";

const AdminHRegistrationExportExcel = ({eventId}) => {
    const handleOkEvent = () => {
        //console.log("eventId", eventId)
        AdminHRegistrationListApi.handleExportRegistration(eventId);
    };

    return (
        <Button
            type="primary"
            className="btn-form-event"
            onClick={handleOkEvent}
            style={{
                backgroundColor: "#217346",
            }}
        >
            Xuất Excel
            <FontAwesomeIcon
                icon={faFileExcel}
                style={{color: "#ffffff", marginLeft: "7px"}}
            />
        </Button>
    );
};

export default AdminHRegistrationExportExcel;
