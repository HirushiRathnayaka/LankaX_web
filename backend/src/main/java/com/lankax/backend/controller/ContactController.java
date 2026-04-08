package com.lankax.backend.controller;

import com.lankax.backend.dto.ContactRequest;
import com.lankax.backend.dto.ContactResponse;
import com.lankax.backend.entity.ContactMessage;
import com.lankax.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponse> submit(@Valid @RequestBody ContactRequest request) {
        ContactMessage saved = contactService.saveMessage(request);
        ContactResponse response = new ContactResponse(saved.getId(), "Thank you! LankaX Solution will contact you soon.");
        return ResponseEntity.ok(response);
    }
}
