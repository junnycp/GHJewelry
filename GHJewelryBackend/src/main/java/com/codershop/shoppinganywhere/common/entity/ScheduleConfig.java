package com.codershop.shoppinganywhere.common.entity;import javax.persistence.*;import java.util.Date;/** * com.fis.fw.core.entity.ScheduleConfig * TungHuynh * Created by sondt18@fpt.com.vn * Date 24/06/2019 9:47 AM */@Entity@Table(name = "SCHEDULE_CONFIG", schema = "ADMIN_DTHGD")public class ScheduleConfig {    private static final long serialVersionUID = 1L;    @Id    @Column(name = "SCHEDULE_CONFIG_ID")    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SCHEDULE_CONFIG_SEQ")    @SequenceGenerator(schema = "ADMIN_DTHGD", sequenceName = "SCHEDULE_CONFIG_SEQ", name = "SCHEDULE_CONFIG_SEQ", allocationSize = 1)    private Integer scheduleConfigId;    @Column(name = "SCHEDULE_CODE")    private String scheduleCode;    @Column(name = "SCHEDULE_NAME")    private String scheduleName;    @Column(name = "PARAMS")    private String params;    @Column(name = "STATUS")    private String status;    @Column(name = "CREATE_TIME")    @Temporal(TemporalType.TIMESTAMP)    private Date createTime;    public Integer getScheduleConfigId() {        return scheduleConfigId;    }    public void setScheduleConfigId(Integer scheduleConfigId) {        this.scheduleConfigId = scheduleConfigId;    }    public String getScheduleCode() {        return scheduleCode;    }    public void setScheduleCode(String scheduleCode) {        this.scheduleCode = scheduleCode;    }    public String getScheduleName() {        return scheduleName;    }    public void setScheduleName(String scheduleName) {        this.scheduleName = scheduleName;    }    public String getParams() {        return params;    }    public void setParams(String params) {        this.params = params;    }    public String getStatus() {        return status;    }    public void setStatus(String status) {        this.status = status;    }}