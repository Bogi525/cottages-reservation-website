package pia.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pia.backend.db.DB;
import pia.backend.models.Cottage;
import pia.backend.models.CottageImage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/cottages")
@CrossOrigin(origins = "http://localhost:4200")
public class CottagesController {
    
    @GetMapping("get-cottage-count")
    public int getCottageCount() {
        int res = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select COUNT(*) from cottages")
        ) {

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                res = rs.getInt("COUNT(*)");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return res;
    }

    @GetMapping("/search-by-name/{name}")
    public List<Cottage> searchCottageByName(@PathVariable String name) {
        List<Cottage> cottages = new ArrayList<Cottage>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from cottages where name = ?")
        ) {
            stmt.setString(1, name);

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Cottage newCottage = new Cottage(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("location"),
                    rs.getString("services"),
                    rs.getInt("spring_price"),
                    rs.getInt("summer_price"),
                    rs.getInt("autumn_price"),
                    rs.getInt("winter_price"),
                    rs.getString("phone"),
                    rs.getString("owner_username")
                );

                cottages.add(newCottage);
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cottages;
    }

    @GetMapping("/search-by-location/{location}")
    public List<Cottage> searchCottageByLocation(@PathVariable String location) {
        List<Cottage> cottages = new ArrayList<Cottage>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from cottages where location = ?")
        ) {
            stmt.setString(1, location);

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Cottage newCottage = new Cottage(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("location"),
                    rs.getString("services"),
                    rs.getInt("spring_price"),
                    rs.getInt("summer_price"),
                    rs.getInt("autumn_price"),
                    rs.getInt("winter_price"),
                    rs.getString("phone"),
                    rs.getString("owner_username")
                );

                cottages.add(newCottage);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cottages;
    }

    @GetMapping("/search-by-name-and-location/{name}/{location}")
    public List<Cottage> searchCottageByNameAndLocation(@PathVariable String name, @PathVariable String location) {
        List<Cottage> cottages = new ArrayList<Cottage>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from cottages where name = ? and location = ?")
        ) {
            stmt.setString(1, name);
            stmt.setString(2, location);

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Cottage newCottage = new Cottage(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("location"),
                    rs.getString("services"),
                    rs.getInt("spring_price"),
                    rs.getInt("summer_price"),
                    rs.getInt("autumn_price"),
                    rs.getInt("winter_price"),
                    rs.getString("phone"),
                    rs.getString("owner_username")
                );

                cottages.add(newCottage);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cottages;
    }
    
    @GetMapping("get-owners-cottages/{owner_username}")
    public List<Cottage> getOwnersCottages(@PathVariable String owner_username) {
        List<Cottage> cottages = new ArrayList<Cottage>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from cottages where owner_username = ?")
        ) {
            stmt.setString(1, owner_username);

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Cottage newCottage = new Cottage(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("location"),
                    rs.getString("services"),
                    rs.getDouble("spring_price"),
                    rs.getDouble("summer_price"),
                    rs.getDouble("autumn_price"),
                    rs.getDouble("winter_price"),
                    rs.getString("phone"),
                    rs.getString("owner_username")
                );

                cottages.add(newCottage);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cottages;
    }
    
    @PostMapping("/edit-cottage")
    public Boolean editCottage(@RequestBody Cottage cottage) {
        System.out.println("Editing cottage...");
        int rs = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement(
                "UPDATE cottages SET name = ?, location = ?, services = ?, spring_price = ?, " +
                "summer_price = ?, autumn_price = ?, winter_price = ?, phone = ? WHERE id = ?"
            );
        ) {
            stmt.setString(1, cottage.getName());
            stmt.setString(2, cottage.getLocation());
            stmt.setString(3, cottage.getServices());
            stmt.setDouble(4, cottage.getSpring_price());
            stmt.setDouble(5, cottage.getSummer_price());
            stmt.setDouble(6, cottage.getAutumn_price());
            stmt.setDouble(7, cottage.getWinter_price());
            stmt.setString(8, cottage.getPhone());
            stmt.setInt(9, cottage.getId());

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }
    
    @PostMapping("/delete-cottage")
    public Boolean deleteCottage(@RequestBody int id) {
        System.out.println("Deleting a cottage...");
        int rs = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("delete from cottages where id = ?");
        ) {
            stmt.setInt(1, id);

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (rs > 0) return true;
        return false;
    }
    
    @PostMapping("/add-cottage")
    public Boolean addCottage(@RequestBody Cottage cottage) {
        int rs = 0;
        
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("insert into cottages ( name, location, services, spring_price, summer_price," + 
            "autumn_price, winter_price, phone, owner_username ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ? )");
        ) {
            stmt.setString(1, cottage.getName());
            stmt.setString(2, cottage.getLocation());
            stmt.setString(3, cottage.getServices());
            stmt.setDouble(4, cottage.getSpring_price());
            stmt.setDouble(5, cottage.getSummer_price());
            stmt.setDouble(6, cottage.getAutumn_price());
            stmt.setDouble(7, cottage.getWinter_price());
            stmt.setString(8, cottage.getPhone());
            stmt.setString(9, cottage.getOwner_username());

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (rs > 0) return true;
        return false;
    }

    @PostMapping("delete-owners-cottages")
    public Boolean deleteOwnersCottages(@RequestBody String owner_username) {
        int rs = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("delete from cottages where owner_username = ?")
        ) {
            stmt.setString(1, owner_username);

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }
    
    @GetMapping("all-cottages")
    public List<Cottage> getAllCottages() {
        List<Cottage> cottages = new ArrayList<Cottage>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from cottages")
        ) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Cottage newCottage = new Cottage(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("location"),
                    rs.getString("services"),
                    rs.getDouble("spring_price"),
                    rs.getDouble("summer_price"),
                    rs.getDouble("autumn_price"),
                    rs.getDouble("winter_price"),
                    rs.getString("phone"),
                    rs.getString("owner_username")
                );

                cottages.add(newCottage);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return cottages;
    }
    
    @PostMapping("add-picture")
    public Boolean addCottagePicture(@RequestParam("file") MultipartFile file, @RequestParam("cottage_id") int cottage_id) {
        int rs = 0;

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String projectDir = System.getProperty("user.dir");
        File cottageFolder = new File(projectDir + "/uploads/cottages/" + cottage_id);
        if (!cottageFolder.exists()) {
            cottageFolder.mkdirs();
        }

        int nextNumber = 1;
        for (File picture : cottageFolder.listFiles()) {
            String name = picture.getName();
            int num = Integer.parseInt(name.substring(7, name.lastIndexOf(".")));
            if (num >= nextNumber) nextNumber = num + 1;
        }
        
        String newFileName = "picture" + nextNumber + extension;
        File dest = new File(cottageFolder, newFileName);

        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("insert into cottage_images (cottage_id, image_name) values (?, ?)");
        ) {
            stmt.setInt(1, cottage_id);
            stmt.setString(2, newFileName);

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }

    @GetMapping("get-picture-list/{cottage_id}")
    public List<CottageImage> getPictureList(@PathVariable int cottage_id) {
        List<CottageImage> list = new ArrayList<CottageImage>();
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from cottage_images where cottage_id = ?");
        ) {
            stmt.setInt(1, cottage_id);

            ResultSet rs = stmt.executeQuery();

            while(rs.next()) {
                CottageImage newImage = new CottageImage(rs.getInt("id"), rs.getInt("cottage_id"), rs.getString("image_name"));
                list.add(newImage);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return list;
    }
    
    @GetMapping("get-picture/{cottage_id}/{image_name}")
    public ResponseEntity<byte[]> getMethodName(@PathVariable String cottage_id, @PathVariable String image_name) {
        System.out.println("Getting cottage picture... " + image_name);
        try {
            String projectDir = System.getProperty("user.dir");
            File imageFile = new File(projectDir + "/uploads/cottages/" + cottage_id.toString(), image_name);
            if (!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

            String contentType = URLConnection.guessContentTypeFromName(image_name);

            return ResponseEntity.ok().header("Content-Type", contentType).body(imageBytes);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("get-cottage-name-from-id/{id}")
    public String getCottageNameFromID(@PathVariable int id) {
        System.out.println("Getting cottage name from ID...");
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select name from cottages where id = ?");
        ) {
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                System.out.println(rs.getString("name"));
                return rs.getString("name");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return "";
    }

    @GetMapping("get-cottage-location-from-id/{id}")
    public String getCottageLocationFromID(@PathVariable int id) {
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select location from cottages where id = ?");
        ) {
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return rs.getString("location");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return "";
    }
    
    
}
