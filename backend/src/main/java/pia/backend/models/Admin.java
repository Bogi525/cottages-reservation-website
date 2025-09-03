package pia.backend.models;

public class Admin {
    int id;
    String admin_username;
    String admin_password;
    
    public Admin(int id, String admin_username, String admin_password) {
        this.id = id;
        this.admin_username = admin_username;
        this.admin_password = admin_password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAdmin_username() {
        return admin_username;
    }

    public void setAdmin_username(String admin_username) {
        this.admin_username = admin_username;
    }

    public String getAdmin_password() {
        return admin_password;
    }

    public void setAdmin_password(String admin_password) {
        this.admin_password = admin_password;
    }
}
