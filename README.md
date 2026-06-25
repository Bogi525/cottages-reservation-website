# Mountain Cottage Rental Platform

## Overview

Mountain Cottage Rental Platform is a full-stack web application designed for renting mountain cottages throughout Serbia. The system supports three types of users:

- Tourists
- Cottage Owners
- Administrators

The platform enables property discovery, reservation management, user administration, and owner-managed cottage listings through a secure role-based system.

---

## Features

### Authentication & Authorization

- User login with username and password
- Separate administrator login route
- Password hashing and secure credential storage
- Role-based access control
- Password change functionality

### User Registration

- Registration for tourists and cottage owners
- Unique username validation
- Unique email validation
- Profile image upload
- Credit card validation
- Registration requests require administrator approval before activation

### Tourist Features

#### Profile Management

- View personal information
- Update profile information
- Upload/change profile picture
- Update payment card information

#### Cottage Search

- Search cottages by:
  - Name
  - Location
- Browse all available cottages

#### Cottage Details

- Property information
- Image gallery
- Services and amenities
- Seasonal pricing
- Contact information

#### Reservation System

Multi-step reservation workflow:

1. Select:
   - Check-in date and time
   - Check-out date and time
   - Number of adults
   - Number of children

2. Review:
   - Reservation summary
   - Calculated total price
   - Payment information
   - Optional additional requests

Validation includes:

- Availability checks
- Capacity checks
- Business rules enforcement
- Seasonal pricing calculation

#### Reservations

- View active reservations
- Track reservation status

---

### Cottage Owner Features

#### Profile Management

- Update personal information
- Manage profile image

#### Reservation Management

- View pending reservation requests
- Approve reservations
- Reject reservations with mandatory explanation
- Reservations sorted by creation date

#### Cottage Management

Owners can:

- Create cottages
- Edit cottages
- Delete cottages

Cottage information includes:

- Name
- Location
- Services
- Contact phone
- Summer pricing
- Winter pricing
- Image gallery

---

### Administrator Features

#### User Management

- View all users
- Create users
- Edit users
- Delete users
- Deactivate accounts

#### Registration Request Processing

- Approve registrations
- Reject registrations
- Prevent reuse of rejected usernames and email addresses

#### Cottage Oversight

- View all cottages in the system

---

### Public Landing Page

Displays:

- Total number of cottages
- Total number of owners
- Total number of tourists
- Reservations in:
  - Last 24 hours
  - Last 7 days
  - Last 30 days

Provides cottage search functionality for non-registered visitors.

---

## Technology Stack

### Frontend

- Angular
- TypeScript
- HTML
- CSS

### Backend

- Java
- Spring Boot
- REST API

### Database

- MySQL
