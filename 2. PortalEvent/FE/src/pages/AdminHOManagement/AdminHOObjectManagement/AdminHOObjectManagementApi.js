import { request } from "../../../helper/Request.helper";
import { URL_API_ADMIN_HO_MANAGEMENT } from "../../ApiUrl";

const api = URL_API_ADMIN_HO_MANAGEMENT + `/object-management`;

export class AdminHOObjectManagementApi {
  static objectList = (page, searchName) => {
    return request({
      method: "GET",
      url: api + `/list-object-approved`,
      params: {
        name: searchName,
        page: page,
      },
    });
  };

  static detailObject = (id) => {
    return request({
      method: "GET",
      url: api + `/detail-object/` + id,
    });
  };

  static addObject = (data) => {
    return request({
      method: "POST",
      url: api + `/post-object`,
      data: data,
    });
  };

  static updateObject = (id, data) => {
    return request({
      method: "PUT",
      url: api + `/update-object/` + id,
      data: data,
    });
  };

  static deleteObject = (id) => {
    return request({
      method: "DELETE",
      url: api + `/delete-object/` + id,
    });
  };
}
