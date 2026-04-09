package com.lankax.backend.service;

import com.lankax.backend.entity.ContactMessage;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GmailContactNotificationService implements ContactNotificationService {

    private static final DateTimeFormatter DATE_TIME_FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");

    private final JavaMailSender mailSender;
    private final ZoneId appZoneId;

    @Value("${app.mail.notifications.enabled:false}")
    private boolean notificationsEnabled;

    @Value("${app.mail.notification-to:}")
    private String notificationTo;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${app.mail.from-name:LankaX Website}")
    private String fromName;

    @Override
    public void sendNewContactNotification(ContactMessage contactMessage) {
        if (!notificationsEnabled) {
            log.info("Email notifications are disabled. Skipping Gmail notification.");
            return;
        }

        if (notificationTo == null || notificationTo.isBlank()) {
            log.warn("No notification recipient configured. Skipping Gmail notification.");
            return;
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(notificationTo);

        if (fromEmail != null && !fromEmail.isBlank()) {
            mail.setFrom(fromEmail);
        }

        mail.setReplyTo(contactMessage.getEmail());
        mail.setSubject("New website inquiry from " + contactMessage.getName());
        mail.setText(buildBody(contactMessage));

        try {
            mailSender.send(mail);
        } catch (MailException ex) {
            log.error("Failed to send contact notification email for message id {}", contactMessage.getId(), ex);
        }
    }

    private String buildBody(ContactMessage contactMessage) {
        String submittedAt = contactMessage.getCreatedAt()
            .atZone(appZoneId)
            .format(DATE_TIME_FORMATTER);

        return String.format(
            "You have received a new message from the LankaX website.%n%n" +
            "Submitted at: %s (%s)%n" +
            "Name: %s%n" +
            "Email: %s%n%n" +
            "Message:%n%s%n%n" +
            "Reply directly to this email to answer the customer.%n" +
            "Sender label: %s",
            submittedAt,
            appZoneId,
            contactMessage.getName(),
            contactMessage.getEmail(),
            contactMessage.getMessage(),
            fromName
        );
    }
}
