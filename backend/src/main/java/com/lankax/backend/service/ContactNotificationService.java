package com.lankax.backend.service;

import com.lankax.backend.entity.ContactMessage;

public interface ContactNotificationService {
    void sendNewContactNotification(ContactMessage contactMessage);
}
