package com.lankax.backend.service;

import com.lankax.backend.dto.ContactRequest;
import com.lankax.backend.entity.ContactMessage;
import com.lankax.backend.repository.ContactMessageRepository;
import java.time.Clock;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactNotificationService contactNotificationService;
    private final Clock appClock;

    public ContactMessage saveMessage(ContactRequest request) {
        ContactMessage entity = new ContactMessage();
        entity.setName(request.name().trim());
        entity.setEmail(request.email().trim());
        entity.setMessage(request.message().trim());
        entity.setCreatedAt(LocalDateTime.now(appClock));

        ContactMessage saved = contactMessageRepository.save(entity);
        contactNotificationService.sendNewContactNotification(saved);
        return saved;
    }
}
