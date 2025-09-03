package pia.backend.models;

public class CottageImage {
    int id;
    int cottage_id;
    String image_name;
    
    public CottageImage(int id, int cottage_id, String image_name) {
        this.id = id;
        this.cottage_id = cottage_id;
        this.image_name = image_name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCottage_id() {
        return cottage_id;
    }

    public void setCottage_id(int cottage_id) {
        this.cottage_id = cottage_id;
    }

    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }
}
