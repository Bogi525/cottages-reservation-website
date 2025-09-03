package pia.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pia.backend.db.DB;
import pia.backend.models.Admin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminsController {
    
    @PostMapping("login")
    public Admin adminLogin(@RequestBody Admin admin) {
        System.out.println("Logging in admin.");
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from admins where admin_username = ?")
        ) {
            stmt.setString(1, admin.getAdmin_username());

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Admin res = new Admin(rs.getInt("id"), rs.getString("admin_username"), rs.getString("admin_password"));
                System.out.println("Testing encrypted password..." + admin.getAdmin_password() + "_______" + res.getAdmin_password());
                final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                if (!passwordEncoder.matches(admin.getAdmin_password(), res.getAdmin_password())) return null;
                return res;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("register")
    public Boolean adminRegister(@RequestBody Admin admin) {
        int rs = 0;
        System.out.println("Registering admin." + admin.getAdmin_password());
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("insert into admins (admin_username, admin_password) values (?, ?)");
        ) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            admin.setAdmin_password(passwordEncoder.encode(admin.getAdmin_password()));

            stmt.setString(1, admin.getAdmin_username());
            stmt.setString(2, admin.getAdmin_password());

            rs = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (rs > 0) return true;
        return false;
    }
    
}
