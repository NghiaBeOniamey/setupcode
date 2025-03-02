/**
 All of the routes for the Soft UI Dashboard React are added here,
 You can add a new route, customize the routes and delete the routes here.
 Once you add a new route on this file it will be visible automatically on
 the Sidenav.
 For adding a new route you can follow the existing routes in the routes array.
 1. The `type` key with the `collapse` value is used for a route.
 2. The `type` key with the `title` value is used for a title inside the Sidenav.
 3. The `type` key with the `divider` value is used for a divider between Sidenav items.
 4. The `name` key is used for the name of the route on the Sidenav.
 5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
 6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
 7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
 inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
 8. The `route` key is used to store the route location which is used for the react router.
 9. The `href` key is used to store the external links location.
 10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
 10. The `component` key is used to store the component of its route.
 */

// Argon Dashboard 2 MUI components
import ArgonBox from "../../components/ArgonBox";
// Component
import OREventRegister from "../../pages/OrganizerManagement/OREventRegister";
import OREventRegistered from "../../pages/OrganizerManagement/OREventRegistered";
import ORHireDesignList from "../../pages/OrganizerManagement/ORHireDesignList";
import OREventInSemester from "../../pages/OrganizerManagement/OREventInSemester";
import ORStatisticsEvent from "../../pages/OrganizerManagement/ORStatisticsEvent";
// import OREImportTutorials from "../../pages/OrganizerManagement/ORImportTutorials";
// import ORPeriodicEvent from "../../pages/OrganizerManagement/ORPeriodicEvent";
import ORMultipleRegister from "../../pages/OrganizerManagement/ORMultipleRegister";
import ORLecturerEvent from "../../pages/OrganizerManagement/ORLecturerEvent";

const OrganizerRoutes = [
    // {
    //     type: "route",
    //     name: "Thống kê",
    //     key: "statistics-event",
    //     route: "/statistics-event",
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <ORStatisticsEvent/>,
    // },
    {
        type: "route",
        name: "Đăng ký sự kiện",
        key: "event-register",
        route: "/event-register",
        icon: (
            <ArgonBox
                component="i"
                color="primary"
                fontSize="14px"
                className="ni ni-tv-2"
            />
        ),
        component: <OREventRegister/>,
    },
    // {
    //     type: "route",
    //     name: "Đăng ký hàng loạt",
    //     key: "multiple-register",
    //     route: "/multiple-register",
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <ORMultipleRegister/>,
    // },
    {
        type: "route",
        name: "Quản lý sự kiện",
        key: "event-registed",
        route: "/event-registed",
        icon: (
            <ArgonBox
                component="i"
                color="primary"
                fontSize="14px"
                className="ni ni-tv-2"
            />
        ),
        component: <OREventRegistered/>,
    },
    // {
    //     type: "route",
    //     name: "Import Tutorials",
    //     key: "import-tutorials",
    //     route: "/import-tutorials",
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <OREImportTutorials/>,
    // },
    // {
    //     type: "route",
    //     name: "Sự kiện cần booking",
    //     key: "hire-design-list",
    //     route: "/hire-design-list",
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <ORHireDesignList/>,
    // },
    // {
    //     type: "route",
    //     name: "Sự kiện trong kỳ",
    //     key: "event-in-semester",
    //     route: "/event-in-semester",
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <OREventInSemester/>,
    // },
    // {
    //     type: "route",
    //     name: "Sự kiện hàng kỳ",
    //     key: "periodic-event",
    //     route: "/periodic-event",
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <ORPeriodicEvent/>,
    // },
    // {
    //     type: "redirect",
    //     name: "Sự kiện dành cho Giảng viên",
    //     key: "lecturer-event",
    //     route: "/home",
    //     redirect: true,
    //     icon: (
    //         <ArgonBox
    //             component="i"
    //             color="primary"
    //             fontSize="14px"
    //             className="ni ni-tv-2"
    //         />
    //     ),
    //     component: <ORLecturerEvent/>,
    // },
];

export default OrganizerRoutes;
