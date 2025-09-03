package pia.backend.models;

public class User {
    private int id;
    private String user_username;
    private String user_password;
    private String user_firstname;
    private String user_lastname;
    private String gender;
    private String address;
    private String contact_number;
    private String email;
    private String profile_picture;
    private String credit_card_number;
    private String user_type;
    private Boolean deactivated;
    private String acceptance_status;

    public User(int id, String user_username, String user_password, String user_firstname, String user_lastname, String gender, String address, String contact_number,
            String email, String profile_picture, String credit_card_number, String user_type, Boolean deactivated, String acceptance_status) {
        this.id = id;
        this.user_username = user_username;
        this.user_password = user_password;
        this.user_firstname = user_firstname;
        this.user_lastname = user_lastname;
        this.gender = gender;
        this.address = address;
        this.contact_number = contact_number;
        this.email = email;
        this.profile_picture = profile_picture;
        this.credit_card_number = credit_card_number;
        this.user_type = user_type;
        this.deactivated = deactivated;
        this.acceptance_status = acceptance_status;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_username() {
        return user_username;
    }

    public void setUser_username(String user_username) {
        this.user_username = user_username;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_firstname() {
        return user_firstname;
    }

    public void setUser_firstname(String user_firstname) {
        this.user_firstname = user_firstname;
    }

    public String getUser_lastname() {
        return user_lastname;
    }

    public void setUser_lastname(String user_lastname) {
        this.user_lastname = user_lastname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfile_picture() {
        return profile_picture;
    }

    public void setProfile_picture(String profile_picture) {
        this.profile_picture = profile_picture;
    }

    public String getCredit_card_number() {
        return credit_card_number;
    }

    public void setCredit_card_number(String credit_card_number) {
        this.credit_card_number = credit_card_number;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public Boolean getDeactivated() {
        return deactivated;
    }

    public void setDeactivated(Boolean deactivated) {
        this.deactivated = deactivated;
    }

    public String getAcceptance_status() {
        return acceptance_status;
    }

    public void setAcceptance_status(String acceptance_status) {
        this.acceptance_status = acceptance_status;
    }

}
