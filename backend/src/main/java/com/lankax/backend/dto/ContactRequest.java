package com.lankax.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
    @NotBlank(message = "Name is required")
    @Size(max = 120, message = "Name is too long")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    @Size(max = 160, message = "Email is too long")
    String email,

    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message is too long")
    String message
) {
}
