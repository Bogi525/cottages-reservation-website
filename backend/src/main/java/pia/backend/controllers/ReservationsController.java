package pia.backend.controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pia.backend.db.DB;
import pia.backend.models.Reservation;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/reservations")
@CrossOrigin( origins = "http://localhost:4200")
public class ReservationsController {
    
    @PostMapping("/add-pending")
    public Boolean addPending(@RequestBody Reservation reservation) {
        int rs = 0;
        
        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("insert into reservations (user_id, cottage_id, start_date, end_date, adults," +
             "children, additional_info, total_price, status) values ( ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        ) {
            stmt.setInt(1, reservation.getUser_id());
            stmt.setInt(2, reservation.getCottage_id());
            stmt.setTimestamp(3, Timestamp.valueOf(reservation.getStart_date()));
            stmt.setTimestamp(4, Timestamp.valueOf(reservation.getEnd_date()));
            stmt.setInt(5, reservation.getAdults());
            stmt.setInt(6, reservation.getChildren());
            stmt.setString(7, reservation.getAdditional_info());
            stmt.setDouble(8, reservation.getTotal_price());

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if (rs > 0) return true;
        return false;
    }
    
    @GetMapping("/get-pending-reservations-for-owner/{owner_username}")
    public List<Reservation> getPendingReservationsForOwner(@PathVariable String owner_username) {
        System.out.println("Getting pending reservations for owner...");
        List<Reservation> reservations = new ArrayList<Reservation>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select reservations.* from reservations " +
            "join cottages on reservations.cottage_id = cottages.id where cottages.owner_username = ? and reservations.status = 'pending'"
        );
        ) {
            stmt.setString(1, owner_username);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Reservation r = new Reservation(
                    rs.getInt("id"),rs.getInt("user_id"),
                    rs.getInt("cottage_id"), rs.getTimestamp("start_date").toLocalDateTime(),
                    rs.getTimestamp("end_date").toLocalDateTime(), rs.getInt("adults"),
                    rs.getInt("children"), rs.getString("additional_info"), rs.getString("status"),
                    rs.getDouble("total_price"), rs.getString("comment")
                );

                reservations.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reservations;
    }

    @GetMapping("/get-pending-reservations-from-tourist/{tourist_id}")
    public List<Reservation> getPendingReservationsFromTourist(@PathVariable String tourist_id) {
        System.out.println("Getting pending reservations from tourist...");
        List<Reservation> reservations = new ArrayList<Reservation>();

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select * from reservations where user_id = ? and status = 'pending'")
        ) {
            stmt.setString(1, tourist_id);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Reservation r = new Reservation(
                    rs.getInt("id"),rs.getInt("user_id"),
                    rs.getInt("cottage_id"), rs.getTimestamp("start_date").toLocalDateTime(),
                    rs.getTimestamp("end_date").toLocalDateTime(), rs.getInt("adults"),
                    rs.getInt("children"), rs.getString("additional_info"), rs.getString("status"),
                    rs.getDouble("total_price"), rs.getString("comment")
                );

                reservations.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reservations;
    }

    @PostMapping("/accept-pending-reservation")
    public Boolean acceptPendingReservation(@RequestBody Reservation reservation) {
        System.out.println("Accepting reservation...");
        int rs = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update reservations set status = 'accepted', comment = ? where id = ?");
        ) {
            stmt.setString(1, reservation.getComment());
            stmt.setInt(2, reservation.getId());

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }
    
    @PostMapping("/reject-pending-reservation")
    public Boolean rejectPendingReservation(@RequestBody Reservation reservation) {
        System.out.println("Rejecting reservation...");
        int rs = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("update reservations set status = 'rejected', comment = ? where id = ?");
        ) {
            stmt.setString(1, reservation.getComment());
            stmt.setInt(2, reservation.getId());

            rs = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (rs > 0) return true;
        return false;
    }

    @GetMapping("/get-reservation-count/1d")
    public int getReservationCountLastDay() {
        int res = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select COUNT(*) from reservations where (start_date >= NOW() - INTERVAL 1 DAY " +
                "or end_date >= NOW() - INTERVAL 1 DAY) and start_date < NOW() and status = 'accepted'");
            
        ) {
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                res = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return res;
    }

    @GetMapping("/get-reservation-count/7d")
    public int getReservationCountLast7Days() {
        int res = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select COUNT(*) from reservations where (start_date >= NOW() - INTERVAL 7 DAY " +
                "or end_date >= NOW() - INTERVAL 7 DAY) and start_date < NOW() and status = 'accepted'");
            
        ) {
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                res = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return res;
    }

    @GetMapping("/get-reservation-count/30d")
    public int getReservationCountLast30Days() {
        int res = 0;

        try (
            Connection conn = DB.source().getConnection();
            PreparedStatement stmt = conn.prepareStatement("select COUNT(*) from reservations where (start_date >= NOW() - INTERVAL 30 DAY " +
                "or end_date >= NOW() - INTERVAL 30 DAY) and start_date < NOW() and status = 'accepted'");
            
        ) {
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                res = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return res;
    }

    
    
}
