package pia.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/credit-cards")
@CrossOrigin(origins = "http://localhost:4200")
public class CreditCardsController {

    @GetMapping("/get-picture/{credit_card_picture}")
    public ResponseEntity<byte[]> getPicture(@PathVariable String credit_card_picture) {
        System.out.println("Getting credit card picture... " + credit_card_picture);
        try {
            String projectDir = System.getProperty("user.dir");
            File imageFile = new File(projectDir + "/uploads/credit_cards", credit_card_picture);
            if (!imageFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

            String contentType = URLConnection.guessContentTypeFromName(credit_card_picture);

            return ResponseEntity.ok().header("Content-Type", contentType).body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
