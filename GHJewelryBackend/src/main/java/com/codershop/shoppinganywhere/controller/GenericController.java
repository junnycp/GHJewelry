package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.service.JpaGenericService;
import com.codershop.shoppinganywhere.model.MessagesResponse;
import com.codershop.shoppinganywhere.common.message.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;

/**
 * Author: PhucVM
 * Date: 22/10/2019
 */
public class GenericController<E, P extends Serializable> {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private static final int LOG_BEGIN = 0;
    private static final int LOG_END = 1;

    @Autowired
    private JpaGenericService<E, P> genericService;

    public JpaGenericService<E, P> getService() {
        return genericService;
    }

    @SuppressWarnings("unchecked")
    public <G> G getService(Class<G> customType) {
        return (G) genericService;
    }

    /**
     * Show log
     * @param type (0: begin log, 1: end log)
     * @param method
     * @param startTime
     */
    public void showLog(int type, String method, long startTime) {
//        logger.info("User: "
//                + SecurityContextHolder.getContext().getAuthentication().getName()
//                + (type == 0 ? " BEGIN " : " END ")
//                + method
//                + (type == 1 ? " in " + (System.currentTimeMillis() - startTime) + " ms" : ""));
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'VIEW', this)")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable P id) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/find-by-id", startTime);

        MessagesResponse msg = new MessagesResponse();
        msg.setData(genericService.findById(id));

        showLog(LOG_END, "/find-by-id", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'VIEW', this)")
    @RequestMapping(value = "/get-all", method = RequestMethod.POST, consumes = { "application/json" })
    @ResponseBody
    public ResponseEntity<Object> findAll(@RequestBody List<OrderBy> orderBys) throws Exception {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/get-all", startTime);

        MessagesResponse msg = new MessagesResponse();
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.SUCCESS).withBody(genericService.queryAllAndSort(orderBys)));
        msg.setData(genericService.queryAllAndSort(orderBys));

        showLog(LOG_END, "/get-all", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'VIEW', this)")
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> page(@RequestParam int page, @RequestParam int size, @RequestBody List<OrderBy> orderBys) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/page", startTime);

        Page<E> pPage = genericService.findPage(page, size);
        PagnationRespBody<E> responseBody = new PagnationRespBody<E>().withContent(pPage.getContent())
                .withTotalPage(pPage.getTotalPages()).withNumRec(pPage.getNumberOfElements());
        MessagesResponse msg = new MessagesResponse();
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.SUCCESS).withBody(responseBody));
        msg.setData(responseBody);

        showLog(LOG_END, "/page", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'VIEW', this)")
    @RequestMapping(value = "/find-by-example", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> findByExample(@RequestBody E e) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/find-by-example", startTime);

        MessagesResponse msg = new MessagesResponse();
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.SUCCESS).withBody(genericService.findByExample(e)));
        msg.setData(genericService.findByExample(e));

        showLog(LOG_END, "/find-by-example", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'CREATE', this)")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> create(@RequestBody @Valid E e) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/create", startTime);

        E createdObject = genericService.save(e);
        MessagesResponse msg = new MessagesResponse();
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.CREAT_SUCCESS).withBody(createdObject));
        msg.setData(createdObject);

        showLog(LOG_END, "/create", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'UPDATE', this)")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<Object> update(@RequestBody @Valid E e) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/update", startTime);

        E updatedObj = genericService.save(e);
        MessagesResponse msg = new MessagesResponse();
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.UPDATE_SUCCESS).withBody(updatedObj));
        msg.setData(updatedObj);

        showLog(LOG_END, "/update", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'DELETE', this)")
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> delete(@PathVariable P id) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/delete", startTime);

        genericService.delete(id);
        MessagesResponse msg = new MessagesResponse();
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.DELETE_SUCCESS).emptyBody());

        showLog(LOG_END, "/delete", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/query", method = RequestMethod.POST)
    @PreAuthorize("@appAuthorizer.authorize(authentication, 'VIEW', this)")
    @ResponseBody
    public ResponseEntity<Object> query(@Valid @NonNull @RequestBody QueryRequest<E> queryRequest) {
        long startTime = System.currentTimeMillis();
        showLog(LOG_BEGIN, "/query", startTime);

        Object resultObj = genericService.query(queryRequest);
        MessagesResponse msg = new MessagesResponse();
        if (!(resultObj instanceof Page<?>)) {
//            msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.SUCCESS).withBody(resultObj));
            msg.setData(resultObj);
            showLog(LOG_END, "/query", startTime);
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        Page<E> pPage = (Page<E>) (resultObj);
        PagnationRespBody<E> responseBody = new PagnationRespBody<E>().withContent(pPage.getContent())
                .withTotalPage(pPage.getTotalPages()).withNumRec(pPage.getNumberOfElements());
//        msg.setData(new APISuccReponse().withMessage(AppConstants.MESSAGE.SUCCESS)
//                .withBody(responseBody));
        msg.setData(responseBody);

        showLog(LOG_END, "/query", startTime);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}