package pia.backend.controllers;

import pia.backend.db.DB;
import pia.backend.models.User;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {

    @PostMapping("/login")
    public User userLogin(@RequestBody User user) {
        System.out.println("Logging in user.");
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from users where user_username = ?")
        ) {
            stmt.setString(1, user.getUser_username());

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {

                if (!rs.getString("acceptance_status").equals("accepted")) return null;
                else if (rs.getBoolean("deactivated") == true) return null;

                User res = new User(
                    rs.getInt("id"),
                    rs.getString("user_username"),
                    rs.getString("user_password"),
                    rs.getString("user_firstname"),
                    rs.getString("user_lastname"),
                    rs.getString("gender"),
                    rs.getString("address"),
                    rs.getString("contact_number"),
                    rs.getString("email"),
                    rs.getString("profile_picture"),
                    rs.getString("credit_card_number"),
                    rs.getString("user_type"),
                    rs.getBoolean("deactivated"),
                    rs.getString("acceptance_status")
                );

                System.out.println("Testing encrypted password...");
                final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                if (!passwordEncoder.matches(user.getUser_password(), res.getUser_password())) return null;

                return res;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }

    @PostMapping("/register")
    public Boolean register(@RequestParam(value = "profile_picture", required = false) MultipartFile file, @RequestPart("user_data") User user
    ) {
        // Extracting user data
        String user_username = user.getUser_username();
        String user_password = user.getUser_password();

        String user_firstname = user.getUser_firstname();
        String user_lastname = user.getUser_lastname();
        String gender = user.getGender();

        String address = user.getAddress();
        String contact_number = user.getContact_number();
        String email = user.getEmail();

        String credit_card_number = user.getCredit_card_number();
        String user_type = user.getUser_type();

        // Encrypting the password
        final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user_password = passwordEncoder.encode(user_password);

        // Getting the absolute path of the directory where profile picture should be saved
        String projectDir = System.getProperty("user.dir");
        String profile_picture_path = "default/default.png";

        // Saving the profile picture
        if (file != null && !file.isEmpty()) {
            if (!file.getContentType().startsWith("image/")) {
                return false;
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String safeUsername = user_username.replaceAll("[^a-zA-Z0-9_-]", "");

            System.out.println(projectDir);
            profile_picture_path = safeUsername + extension;
            File dest = new File(projectDir + "/uploads", safeUsername + extension);
            
            try {
                file.transferTo(dest);
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }

        // Saving the user data in the database
        int rs = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("insert into users (" + 
                                "user_username, user_password, user_firstname, user_lastname, gender, address, contact_number, " + 
                                "email, profile_picture, credit_card_number, user_type, deactivated, acceptance_status" + 
                                ") values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        ) {
            stmt.setString(1, user_username);
            stmt.setString(2, user_password);
            stmt.setString(3, user_firstname);
            stmt.setString(4, user_lastname);
            stmt.setString(5, gender);
            stmt.setString(6, address);
            stmt.setString(7, contact_number);

            stmt.setString(8, email);
            stmt.setString(9, profile_picture_path);
            stmt.setString(10, credit_card_number);
            stmt.setString(11, user_type);
            stmt.setBoolean(12, false);
            stmt.setString(13, "awaiting");

            rs = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Checking if any changes were made. If not something went wrong, hence return false;
        if (rs > 0) return true;
        return false;
    }

    @PostMapping("update-firstname")
    public Boolean updateFirstname(@RequestParam("user_username") String user_username, @RequestParam("new_firstname") String new_firstname) {
        int res = 0;

        System.out.println("Updating first name...");

        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set user_firstname = ? where user_username = ?");
        ) {
            stmt.setString(1, new_firstname);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (res > 0) return true;
        return false;
    }

    @PostMapping("update-lastname")
    public Boolean updateLastname(@RequestParam("user_username") String user_username, @RequestParam("new_lastname") String new_lastname) {
        int res = 0;

        System.out.println("Updating last name...");

        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set user_lastname = ? where user_username = ?");
        ) {
            stmt.setString(1, new_lastname);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (res > 0) return true;
        return false;
    }

    @PostMapping("update-address")
    public Boolean updateAddress(@RequestParam("user_username") String user_username, @RequestParam("new_address") String new_address) {
        int res = 0;

        System.out.println("Updating address...");

        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set address = ? where user_username = ?");
        ) {
            stmt.setString(1, new_address);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (res > 0) return true;
        return false;
    }

    @PostMapping("update-contact-number")
    public Boolean updateContactNumber(@RequestParam("user_username") String user_username, @RequestParam("new_contact_number") String new_contact_number) {
        int res = 0;

        System.out.println("Updating contact number...");

        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set contact_number = ? where user_username = ?");
        ) {
            stmt.setString(1, new_contact_number);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (res > 0) return true;
        return false;
    }

    @PostMapping("update-email")
    public Boolean updateEmail(@RequestParam("user_username") String user_username, @RequestParam("new_email") String new_email) {
        int res = 0;

        System.out.println("Updating contact number...");

        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set email = ? where user_username = ?");
        ) {
            stmt.setString(1, new_email);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (res > 0) return true;
        return false;
    }

    @PostMapping("update-credit-card-number")
    public Boolean updateCreditCardNumber(@RequestParam("user_username") String user_username, @RequestParam("new_credit_card_number") String new_credit_card_number) {
        int res = 0;

        System.out.println("Updating contact number...");

        try (Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set credit_card_number = ? where user_username = ?");
        ) {
            stmt.setString(1, new_credit_card_number);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (res > 0) return true;
        return false;
    }

    @GetMapping("/get-profile-picture/{profile_picture}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String profile_picture) {
        System.out.println("Getting profile picture... " + profile_picture);
        try {
            String projectDir = System.getProperty("user.dir");
            File imageFile = new File(projectDir + "/uploads", profile_picture);
            if (!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

            String contentType = URLConnection.guessContentTypeFromName(profile_picture);

            return ResponseEntity.ok().header("Content-Type", contentType).body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get-profile-picture/default/{profile_picture}")
    public ResponseEntity<byte[]> getDefaultPicture(@PathVariable String profile_picture) {
        System.out.println("Getting default picture..." + profile_picture);
        try {
            String projectDir = System.getProperty("user.dir");
            File imageFile = new File(projectDir + "/uploads/default", profile_picture);
            if (!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

            String contentType = URLConnection.guessContentTypeFromName(profile_picture);

            return ResponseEntity.ok().header("Content_Type", contentType).body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/update-profile-picture")
    public String updateProfilePicture(@RequestParam("user_username") String user_username, @RequestParam("old_profile_picture") String old_profile_picture,
        @RequestParam("new_profile_picture") MultipartFile new_profile_picture
    ) {
        String projectDir = System.getProperty("user.dir");
        String profile_picture_name = "";

        // Deleting old profile picture if not default
        if (!old_profile_picture.equals("default/default.png")) {
            File oldFile = new File(projectDir + "/uploads", old_profile_picture);
            oldFile.delete();
        }

        if (new_profile_picture != null && !new_profile_picture.isEmpty()) {
            if (!new_profile_picture.getContentType().startsWith("image/")) {
                return "";
            }

            String originalFilename = new_profile_picture.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String safeUsername = user_username.replaceAll("[^a-zA-Z0-9_-]", "");

            System.out.println(projectDir);
            profile_picture_name = safeUsername + extension;
            File dest = new File(projectDir + "/uploads", safeUsername + extension);
            
            try {
                new_profile_picture.transferTo(dest);
            } catch (IOException e) {
                e.printStackTrace();
                return "";
            }
        }

        int res = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set profile_picture = ? where user_username = ?")
        ) {
            stmt.setString(1, profile_picture_name);
            stmt.setString(2, user_username);

            res = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        System.out.println("Ending...");
        
        if (res > 0) {
            System.out.println("Good ending...");
            return profile_picture_name;
        }
        return "";
    }

    @GetMapping("/get-awaiting-users")
    public List<User> getAwaitingUsers() {
        List<User> users = new ArrayList<User>();
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from users where acceptance_status = 'awaiting'");
        ) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User newUser = new User(
                    rs.getInt("id"),
                    rs.getString("user_username"),
                    rs.getString("user_password"),
                    rs.getString("user_firstname"),
                    rs.getString("user_lastname"),
                    rs.getString("gender"),
                    rs.getString("address"),
                    rs.getString("contact_number"),
                    rs.getString("email"),
                    rs.getString("profile_picture"),
                    rs.getString("credit_card_number"),
                    rs.getString("user_type"),
                    rs.getBoolean("deactivated"),
                    rs.getString("acceptance_status")
                );
                users.add(newUser);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }
    
    @GetMapping("/accept-awaiting-user/{user_username}")
    public Boolean acceptAwaitingUser(@PathVariable String user_username) {
        int rs = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set acceptance_status = 'accepted' where user_username = ?");
        ) {
            stmt.setString(1, user_username);

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
        e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }

    @GetMapping("/reject-awaiting-user/{user_username}")
    public Boolean rejectAwaitingUser(@PathVariable String user_username) {
        int rs = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set acceptance_status = 'rejected' where user_username = ?");
        ) {
            stmt.setString(1, user_username);

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
        e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }
    
    @GetMapping("/get-accepted-owners")
    public List<User> getAcceptedOwners() {
        List<User> users = new ArrayList<User>();
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from users where acceptance_status = 'accepted' and user_type = 'owner' and deactivated = false");
        ) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User newUser = new User(
                    rs.getInt("id"),
                    rs.getString("user_username"),
                    rs.getString("user_password"),
                    rs.getString("user_firstname"),
                    rs.getString("user_lastname"),
                    rs.getString("gender"),
                    rs.getString("address"),
                    rs.getString("contact_number"),
                    rs.getString("email"),
                    rs.getString("profile_picture"),
                    rs.getString("credit_card_number"),
                    rs.getString("user_type"),
                    rs.getBoolean("deactivated"),
                    rs.getString("acceptance_status")
                );
                users.add(newUser);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    @GetMapping("/get-accepted-tourists")
    public List<User> getAcceptedTourists() {
        List<User> users = new ArrayList<User>();
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from users where acceptance_status = 'accepted' and user_type = 'tourist' and deactivated = false");
        ) {
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                User newUser = new User(
                    rs.getInt("id"),
                    rs.getString("user_username"),
                    rs.getString("user_password"),
                    rs.getString("user_firstname"),
                    rs.getString("user_lastname"),
                    rs.getString("gender"),
                    rs.getString("address"),
                    rs.getString("contact_number"),
                    rs.getString("email"),
                    rs.getString("profile_picture"),
                    rs.getString("credit_card_number"),
                    rs.getString("user_type"),
                    rs.getBoolean("deactivated"),
                    rs.getString("acceptance_status")
                );
                users.add(newUser);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    @GetMapping("/update-user-password/{user_username}/{old_user_password}/{new_user_password}")
    public Boolean updateUserPassword(@PathVariable String user_username, @PathVariable String old_user_password, @PathVariable String new_user_password) {
        System.out.println("Updating password...");
        int rs2 = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt1 = conn.prepareStatement("select * from users where user_username = ?");
            PreparedStatement stmt2 = conn.prepareStatement("update users set user_password = ? where user_username = ?");
        ) {
            stmt1.setString(1, user_username);

            final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            ResultSet rs1 = stmt1.executeQuery();
            if (rs1.next()) {
                String old_password_hash = rs1.getString("user_password");

                if (!passwordEncoder.matches(old_user_password, old_password_hash)) return false;
            } else {
                return false;
            }

            new_user_password = passwordEncoder.encode(new_user_password);

            stmt2.setString(1, new_user_password);
            stmt2.setString(2, user_username);

            rs2 = stmt2.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (rs2 > 0) {
            System.out.println("got here...");
            return true;
        }
        return false;
    }

    @GetMapping("/get-accepted-owners-count")
    public int getAcceptedOwnersCount() {
        int res = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select COUNT(*) from users where user_type = 'owner' and acceptance_status = 'accepted' and deactivated = false")
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
    

    @GetMapping("/get-accepted-tourists-count")
    public int getAcceptedTouristsCount() {
        int res = 0;
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select COUNT(*) from users where user_type = 'tourist' and acceptance_status = 'accepted' and deactivated = false")
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
    
    @PostMapping("/deactivate-user")
    public Boolean deactivateUser(@RequestBody String user_username) {
        System.out.println("Deactivating user...");
        int rs = 0;
    
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set deactivated = true where user_username = ?");
        ) {
            stmt.setString(1,user_username);

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (rs > 0) return true;
        return false;
    }

    @PostMapping("edit-user")
    public Boolean editUser(@RequestBody User user) {
        int rs = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update users set user_firstname = ?, user_lastname = ?, gender = ?," + 
            "address = ?, contact_number = ?, email = ?, credit_card_number = ? where user_username = ?");
        ) {
            stmt.setString(1, user.getUser_firstname());
            stmt.setString(2, user.getUser_lastname());
            stmt.setString(3, user.getGender());
            stmt.setString(4, user.getAddress());
            stmt.setString(5, user.getContact_number());
            stmt.setString(6, user.getEmail());
            stmt.setString(7, user.getCredit_card_number());
            stmt.setString(8, user.getUser_username());

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (rs > 0) return true;
        return false;
    }
}
