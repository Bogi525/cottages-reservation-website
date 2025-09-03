package pia.backend.models;

public class Cottage {
    int id;
    String name;
    String location;
    String services;
    double spring_price;
    double summer_price;
    double autumn_price;
    double winter_price;
    String phone;
    String owner_username;

    public Cottage(int id, String name, String location, String services, double spring_price, double summer_price,
            double autumn_price, double winter_price, String phone, String owner_username) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.services = services;
        this.spring_price = spring_price;
        this.summer_price = summer_price;
        this.autumn_price = autumn_price;
        this.winter_price = winter_price;
        this.phone = phone;
        this.owner_username = owner_username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    public double getSpring_price() {
        return spring_price;
    }

    public void setSpring_price(double spring_price) {
        this.spring_price = spring_price;
    }

    public double getSummer_price() {
        return summer_price;
    }

    public void setSummer_price(double summer_price) {
        this.summer_price = summer_price;
    }

    public double getAutumn_price() {
        return autumn_price;
    }

    public void setAutumn_price(double autumn_price) {
        this.autumn_price = autumn_price;
    }

    public double getWinter_price() {
        return winter_price;
    }

    public void setWinter_price(double winter_price) {
        this.winter_price = winter_price;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOwner_username() {
        return owner_username;
    }

    public void setOwner_username(String owner_username) {
        this.owner_username = owner_username;
    }

}
