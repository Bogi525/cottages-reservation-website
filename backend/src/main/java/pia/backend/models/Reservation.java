package pia.backend.models;

import java.time.LocalDateTime;

public class Reservation {
    int id;
    int user_id;
    int cottage_id;
    LocalDateTime start_date;
    LocalDateTime end_date;
    int adults;
    int children;
    String additional_info;
    String status;
    double total_price;
    String comment;
    
    public Reservation(int id, int user_id, int cottage_id, LocalDateTime start_date, LocalDateTime end_date,
            int adults, int children, String additional_info, String status, double total_price, String comment) {
        this.id = id;
        this.user_id = user_id;
        this.cottage_id = cottage_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.adults = adults;
        this.children = children;
        this.additional_info = additional_info;
        this.status = status;
        this.total_price = total_price;
        this.comment = comment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getCottage_id() {
        return cottage_id;
    }

    public void setCottage_id(int cottage_id) {
        this.cottage_id = cottage_id;
    }

    public LocalDateTime getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDateTime start_date) {
        this.start_date = start_date;
    }

    public LocalDateTime getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDateTime end_date) {
        this.end_date = end_date;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public int getChildren() {
        return children;
    }

    public void setChildren(int children) {
        this.children = children;
    }

    public String getAdditional_info() {
        return additional_info;
    }

    public void setAdditional_info(String additional_info) {
        this.additional_info = additional_info;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
