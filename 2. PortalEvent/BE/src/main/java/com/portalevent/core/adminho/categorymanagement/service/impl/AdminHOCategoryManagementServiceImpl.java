package com.portalevent.core.adminho.categorymanagement.service.impl;

import com.portalevent.core.adminho.categorymanagement.model.request.AdminHOCategoryManagementCreateRequest;
import com.portalevent.core.adminho.categorymanagement.model.request.AdminHOCategoryManagementListRequest;
import com.portalevent.core.adminho.categorymanagement.model.response.AdminHOCategoryManagementListReponse;
import com.portalevent.core.adminho.categorymanagement.repository.AdminHOCategoryManagementRepository;
import com.portalevent.core.adminho.categorymanagement.service.AdminHOCategoryManagementService;
import com.portalevent.core.common.PageableObject;
import com.portalevent.core.common.ResponseObject;
import com.portalevent.entity.Category;
import com.portalevent.infrastructure.constant.Message;
import com.portalevent.infrastructure.exeption.rest.RestApiException;
import com.portalevent.util.CompareUtils;
import com.portalevent.util.LoggerUtil;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class AdminHOCategoryManagementServiceImpl implements AdminHOCategoryManagementService {

    private final LoggerUtil loggerUtil;

    private final AdminHOCategoryManagementRepository apCategoryReponsitory;

    public AdminHOCategoryManagementServiceImpl(LoggerUtil loggerUtil, AdminHOCategoryManagementRepository apCategoryReponsitory) {
        this.loggerUtil = loggerUtil;
        this.apCategoryReponsitory = apCategoryReponsitory;
    }

    /**
     * @param request để thực hiện chức năng tìm kiếm
     * @return list data thể loại và tích hợp tìm kiếm
     */
    @Transactional
    @Override
    public PageableObject<AdminHOCategoryManagementListReponse> getListCategory(AdminHOCategoryManagementListRequest request) {
        request.setName(request.getName().replaceAll("\\s+", " "));
        return new PageableObject<AdminHOCategoryManagementListReponse>(apCategoryReponsitory.getCategoryList(PageRequest.of(request.getPage(),
                request.getSize()), request));
    }

    /**
     * @param id để lấy ra 1 thể loại trong list thể loại theo id thể loại
     * @return trả ra 1 thể loại theo id
     */
    @Override
    public ResponseObject getDetailCategory(String id) {
        return new ResponseObject(apCategoryReponsitory.findById(id));
    }

    /**
     * @param request hứng data từ FE để thêm thể loại
     * @return thêm thể loại thành công
     */
    @Override
    public Category postCategory(@Valid AdminHOCategoryManagementCreateRequest request) {
        request.setName(request.getName().replaceAll("\\s+", " "));
        List<AdminHOCategoryManagementListReponse> categoryListReponse = apCategoryReponsitory.getCategoryByName(request.getName());
        if (!categoryListReponse.isEmpty()) {
            throw new RestApiException(Message.CATEGORY_NAME_ALREADY_EXIST);
        }
        if (request.getName().length() >= 100) {
            throw new RestApiException(Message.CATEGORY_NAME_LESS_THAN_100_CHARACTERS);
        }
        Category category = new Category();
        category.setName(request.getName() != null ? request.getName().trim() : null);
        StringBuffer message = new StringBuffer();
        message.append("Đã tạo thành công thể loại ");
        message.append(request.getName().trim());
        loggerUtil.sendLog(message.toString(), null);
        return apCategoryReponsitory.save(category);
    }

    /**
     * @param id      lấy ra id của thể loại
     * @param request hứng data từ FE để cập nhật thể loại
     * @return cập nhật thể loại
     */
    @Override
    public Category updateCategory(String id, @Valid AdminHOCategoryManagementCreateRequest request) {
        request.setName(request.getName().replaceAll("\\s+", " "));
        Category category = apCategoryReponsitory.findById(id).get();
        if (request.getName().length() >= 100) {
            throw new RestApiException(Message.CATEGORY_NAME_LESS_THAN_100_CHARACTERS);
        }
        List<AdminHOCategoryManagementListReponse> categoryListReponse = apCategoryReponsitory.getCategoryByName(request.getName());
        if (!categoryListReponse.isEmpty()) {
            throw new RestApiException(Message.CATEGORY_NAME_ALREADY_EXIST);
        }
        if (category != null) {
            if (!category.getName().equals(request.getName())) {
                loggerUtil.sendLog(CompareUtils.getMessageProperyChange("Đã cập nhật tên thể loại", category.getName(), request.getName(), ""), null);
                category.setName(request.getName() != null ? request.getName().trim() : null);
                return apCategoryReponsitory.save(category);
            }else {
                throw new RestApiException(Message.NOTHING_TO_SAVE);
            }
        }
        return null;
    }

    /**
     * @param id lấy ra id của thể loại
     * @return delete thể loại
     */
    @Override
    public Boolean deleteCategory(String id) {
        Category category = apCategoryReponsitory.findById(id).get();
        if (category != null) {
            apCategoryReponsitory.delete(category);
            StringBuffer message = new StringBuffer();
            message.append("Đã xóa thành công thể loại ");
            message.append(category.getName());
            loggerUtil.sendLog(message.toString(), null);
            return true;
        }
        return false;
    }

}
