-- Clear existing data if needed
TRUNCATE TABLE transactions, reviews, messages, notifications, bookings, services, users RESTART IDENTITY;

-- Admins (5)
-- Admins (5)
INSERT INTO users (email, password_hash, user_type, full_name, gender, date_of_birth, phone, created_at) VALUES
('admin@gmail.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'admin', 'Admin One', 'male', '1985-01-01', '+1234567890', '2023-01-01 08:00:00+00'),
('admin2@platform.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'admin', 'Admin Two', 'female', '1986-02-02', '+1234567891', '2023-01-02 09:00:00+00'),
('admin3@platform.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'admin', 'Admin Three', 'male', '1987-03-03', '+1234567892', '2023-01-03 10:00:00+00'),
('admin4@platform.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'admin', 'Admin Four', 'female', '1988-04-04', '+1234567893', '2023-01-04 11:00:00+00'),
('admin5@platform.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'admin', 'Admin Five', 'male', '1989-05-05', '+1234567894', '2023-01-05 12:00:00+00');

-- Freelancers (10)
INSERT INTO users (email, password_hash, user_type, full_name, gender, date_of_birth, phone, created_at) VALUES
('dev@gmail.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'John Developer', 'male', '1990-06-06', '+1234567895', '2023-01-06 13:00:00+00'),
('designer1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Sarah Designer', 'female', '1991-07-07', '+1234567896', '2023-01-07 14:00:00+00'),
('writer1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Mike Writer', 'male', '1992-08-08', '+1234567897', '2023-01-08 15:00:00+00'),
('marketer1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Emma Marketer', 'female', '1993-09-09', '+1234567898', '2023-01-09 16:00:00+00'),
('consultant1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'David Consultant', 'male', '1994-10-10', '+1234567899', '2023-01-10 17:00:00+00'),
('tutor1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Lisa Tutor', 'female', '1995-11-11', '+1234567800', '2023-01-11 18:00:00+00'),
('photographer1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'James Photographer', 'male', '1996-12-12', '+1234567801', '2023-01-12 19:00:00+00'),
('editor1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Olivia Editor', 'female', '1997-01-13', '+1234567802', '2023-01-13 20:00:00+00'),
('translator1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Daniel Translator', 'male', '1998-02-14', '+1234567803', '2023-01-14 21:00:00+00'),
('analyst1@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'freelancer', 'Sophia Analyst', 'female', '1999-03-15', '+1234567804', '2023-01-15 22:00:00+00');

-- Clients (15)
INSERT INTO users (email, password_hash, user_type, full_name, gender, date_of_birth, phone, created_at) VALUES
('client@gmail.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client One', 'male', '1980-04-16', '+1234567805', '2023-01-16 08:00:00+00'),
('client2@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Two', 'female', '1981-05-17', '+1234567806', '2023-01-17 09:00:00+00'),
('client3@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Three', 'male', '1982-06-18', '+1234567807', '2023-01-18 10:00:00+00'),
('client4@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Four', 'female', '1983-07-19', '+1234567808', '2023-01-19 11:00:00+00'),
('client5@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Five', 'male', '1984-08-20', '+1234567809', '2023-01-20 12:00:00+00'),
('client6@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Six', 'female', '1985-09-21', '+1234567810', '2023-01-21 13:00:00+00'),
('client7@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Seven', 'male', '1986-10-22', '+1234567811', '2023-01-22 14:00:00+00'),
('client8@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Eight', 'female', '1987-11-23', '+1234567812', '2023-01-23 15:00:00+00'),
('client9@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Nine', 'male', '1988-12-24', '+1234567813', '2023-01-24 16:00:00+00'),
('client10@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Ten', 'female', '1989-01-25', '+1234567814', '2023-01-25 17:00:00+00'),
('client11@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Eleven', 'male', '1990-02-26', '+1234567815', '2023-01-26 18:00:00+00'),
('client12@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Twelve', 'female', '1991-03-27', '+1234567816', '2023-01-27 19:00:00+00'),
('client13@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Thirteen', 'male', '1992-04-28', '+1234567817', '2023-01-28 20:00:00+00'),
('client14@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Fourteen', 'female', '1993-05-29', '+1234567818', '2023-01-29 21:00:00+00'),
('client15@example.com', '$2a$12$zlsdNyY7Dxjr/oXn/IoPWeRKS7.tQiVXYuLZFWBdAtK3gojibO1Ne', 'client', 'Client Fifteen', 'male', '1994-06-30', '+1234567819', '2023-01-30 22:00:00+00');

INSERT INTO services (freelancer_id, title, description, price, is_active, created_at, category) VALUES
-- Freelancer 6 (John Developer) - Web Development
(6, 'Website Development', 'Custom website development', 500.00, true, '2023-02-01 09:00:00+00', 'Web Development'),
(6, 'API Integration', 'Connect your systems via API', 300.00, true, '2023-02-02 10:00:00+00', 'Web Development'),
(6, 'Database Design', 'Optimized database solutions', 400.00, true, '2023-02-03 11:00:00+00', 'Web Development'),
(6, 'E-commerce Site', 'Online store development', 600.00, true, '2023-02-04 12:00:00+00', 'Web Development'),
(6, 'CMS Setup', 'Content management system setup', 250.00, true, '2023-02-05 13:00:00+00', 'Web Development'),

-- Freelancer 7 (Sarah Designer) - Graphic Design
(7, 'Logo Design', 'Professional logo creation', 150.00, true, '2023-02-06 14:00:00+00', 'Graphic Design'),
(7, 'Brand Identity', 'Complete branding package', 350.00, true, '2023-02-07 15:00:00+00', 'Graphic Design'),
(7, 'Business Cards', 'Custom business card design', 100.00, true, '2023-02-08 16:00:00+00', 'Graphic Design'),
(7, 'Social Media Kit', 'Social media templates', 200.00, true, '2023-02-09 17:00:00+00', 'Graphic Design'),
(7, 'Packaging Design', 'Product packaging design', 300.00, true, '2023-02-10 18:00:00+00', 'Graphic Design'),

-- Freelancer 8 (Mike Writer) - Content Writing
(8, 'Blog Article', '1000-word blog post', 80.00, true, '2023-02-11 19:00:00+00', 'Content Writing'),
(8, 'Website Copy', 'Professional website content', 120.00, true, '2023-02-12 20:00:00+00', 'Content Writing'),
(8, 'Product Description', 'E-commerce product text', 50.00, true, '2023-02-13 21:00:00+00', 'Content Writing'),
(8, 'Press Release', 'Company announcement', 150.00, true, '2023-02-14 22:00:00+00', 'Content Writing'),
(8, 'Editing Service', 'Content editing/proofreading', 70.00, true, '2023-02-15 23:00:00+00', 'Content Writing'),

-- Freelancer 9 (Emma Marketer) - Digital Marketing
(9, 'SEO Audit', 'Website SEO analysis', 200.00, true, '2023-02-16 08:00:00+00', 'Digital Marketing'),
(9, 'Google Ads Setup', 'PPC campaign creation', 250.00, true, '2023-02-17 09:00:00+00', 'Digital Marketing'),
(9, 'Social Media Strategy', '3-month content plan', 300.00, true, '2023-02-18 10:00:00+00', 'Digital Marketing'),
(9, 'Email Campaign', 'Marketing email creation', 180.00, true, '2023-02-19 11:00:00+00', 'Digital Marketing'),
(9, 'Market Research', 'Competitor analysis', 220.00, true, '2023-02-20 12:00:00+00', 'Digital Marketing'),

-- Freelancer 10 (David Consultant) - Business Consulting
(10, 'Business Plan', 'Startup business plan', 400.00, true, '2023-02-21 13:00:00+00', 'Business Consulting'),
(10, 'Financial Model', 'Revenue projections', 350.00, true, '2023-02-22 14:00:00+00', 'Business Consulting'),
(10, '1-hour Consultation', 'Business advice session', 100.00, true, '2023-02-23 15:00:00+00', 'Business Consulting'),
(10, 'Pitch Deck', 'Investor presentation', 300.00, true, '2023-02-24 16:00:00+00', 'Business Consulting'),
(10, 'SWOT Analysis', 'Business evaluation', 200.00, true, '2023-02-25 17:00:00+00', 'Business Consulting'),

-- Freelancer 11 (Lisa Tutor) - Education
(11, 'Math Tutoring', '1-hour math lesson', 40.00, true, '2023-02-26 18:00:00+00', 'Education'),
(11, 'English Tutoring', '1-hour English lesson', 40.00, true, '2023-02-27 19:00:00+00', 'Education'),
(11, 'Test Preparation', 'SAT/ACT prep session', 60.00, true, '2023-02-28 20:00:00+00', 'Education'),
(11, 'College Counseling', 'Application guidance', 80.00, true, '2023-03-01 21:00:00+00', 'Education'),
(11, 'Language Tutoring', 'Spanish/French lesson', 45.00, true, '2023-03-02 22:00:00+00', 'Education'),

-- Freelancer 12 (James Photographer) - Photography
(12, 'Portrait Session', '1-hour photo shoot', 150.00, true, '2023-03-03 23:00:00+00', 'Photography'),
(12, 'Product Photography', 'E-commerce images', 120.00, true, '2023-03-04 08:00:00+00', 'Photography'),
(12, 'Event Coverage', '3-hour event photography', 300.00, true, '2023-03-05 09:00:00+00', 'Photography'),
(12, 'Photo Editing', 'Image retouching', 50.00, true, '2023-03-06 10:00:00+00', 'Photography'),
(12, 'Real Estate Photos', 'Property photography', 180.00, true, '2023-03-07 11:00:00+00', 'Photography'),

-- Freelancer 13 (Olivia Editor) - Video Production
(13, 'Video Editing', '1-minute edited video', 75.00, true, '2023-03-08 12:00:00+00', 'Video Production'),
(13, 'Podcast Editing', '30-minute episode', 60.00, true, '2023-03-09 13:00:00+00', 'Video Production'),
(13, 'Color Correction', 'Video color grading', 90.00, true, '2023-03-10 14:00:00+00', 'Video Production'),
(13, 'Audio Cleanup', 'Noise removal', 40.00, true, '2023-03-11 15:00:00+00', 'Video Production'),
(13, 'Motion Graphics', 'Animated titles', 120.00, true, '2023-03-12 16:00:00+00', 'Video Production'),

-- Freelancer 14 (Daniel Translator) - Translation
(14, 'Document Translation', 'Per 1000 words', 80.00, true, '2023-03-13 17:00:00+00', 'Translation'),
(14, 'Website Translation', 'Per page', 50.00, true, '2023-03-14 18:00:00+00', 'Translation'),
(14, 'Certified Translation', 'Official documents', 100.00, true, '2023-03-15 19:00:00+00', 'Translation'),
(14, 'Live Interpretation', 'Per hour', 60.00, true, '2023-03-16 20:00:00+00', 'Translation'),
(14, 'Proofreading', 'Bilingual editing', 45.00, true, '2023-03-17 21:00:00+00', 'Translation'),

-- Freelancer 15 (Sophia Analyst) - Data Analysis
(15, 'Data Analysis', 'Dataset analysis', 150.00, true, '2023-03-18 22:00:00+00', 'Data Analysis'),
(15, 'Excel Dashboard', 'Interactive reports', 200.00, true, '2023-03-19 23:00:00+00', 'Data Analysis'),
(15, 'Survey Analysis', 'Research results', 120.00, true, '2023-03-20 08:00:00+00', 'Data Analysis'),
(15, 'SQL Querying', 'Database extraction', 90.00, true, '2023-03-21 09:00:00+00', 'Data Analysis'),
(15, 'Data Visualization', 'Charts/graphs', 110.00, true, '2023-03-22 10:00:00+00', 'Data Analysis');

INSERT INTO bookings (client_id, service_id, freelancer_id, status, booked_at, completed_at) VALUES
-- Client 16 bookings
(16, 1, 6, 'completed', '2023-03-23 11:00:00+00', '2023-03-25 15:00:00+00'),
(16, 7, 7, 'completed', '2023-03-24 12:00:00+00', '2023-03-26 16:00:00+00'),

-- Client 17 bookings
(17, 2, 6, 'completed', '2023-03-25 13:00:00+00', '2023-03-27 17:00:00+00'),
(17, 8, 7, 'completed', '2023-03-26 14:00:00+00', '2023-03-28 18:00:00+00'),

-- Continue with the same pattern...
-- Client 18 bookings
(18, 3, 6, 'completed', '2023-03-27 15:00:00+00', '2023-03-29 19:00:00+00'),
(18, 9, 7, 'completed', '2023-03-28 16:00:00+00', '2023-03-30 20:00:00+00'),

-- Client 19 bookings
(19, 4, 6, 'completed', '2023-03-29 17:00:00+00', '2023-03-31 21:00:00+00'),
(19, 10, 7, 'completed', '2023-03-30 18:00:00+00', '2023-04-01 22:00:00+00'),

-- Client 20 bookings
(20, 5, 6, 'completed', '2023-03-31 19:00:00+00', '2023-04-02 23:00:00+00'),
(20, 11, 8, 'completed', '2023-04-01 20:00:00+00', '2023-04-03 08:00:00+00'),

-- Continue with remaining bookings...
(21, 12, 8, 'completed', '2023-04-02 21:00:00+00', '2023-04-04 09:00:00+00'),
(21, 17, 9, 'completed', '2023-04-03 22:00:00+00', '2023-04-05 10:00:00+00'),
(22, 13, 8, 'completed', '2023-04-04 23:00:00+00', '2023-04-06 11:00:00+00'),
(22, 18, 9, 'completed', '2023-04-05 08:00:00+00', '2023-04-07 12:00:00+00'),
(23, 14, 8, 'completed', '2023-04-06 09:00:00+00', '2023-04-08 13:00:00+00'),
(23, 19, 9, 'completed', '2023-04-07 10:00:00+00', '2023-04-09 14:00:00+00'),
(24, 15, 8, 'completed', '2023-04-08 11:00:00+00', '2023-04-10 15:00:00+00'),
(24, 20, 9, 'completed', '2023-04-09 12:00:00+00', '2023-04-11 16:00:00+00'),
(25, 16, 9, 'completed', '2023-04-10 13:00:00+00', '2023-04-12 17:00:00+00'),
(25, 21, 10, 'completed', '2023-04-11 14:00:00+00', '2023-04-13 18:00:00+00'),
(26, 22, 10, 'completed', '2023-04-12 15:00:00+00', '2023-04-14 19:00:00+00'),
(26, 27, 11, 'completed', '2023-04-13 16:00:00+00', '2023-04-15 20:00:00+00'),
(27, 23, 10, 'completed', '2023-04-14 17:00:00+00', '2023-04-16 21:00:00+00'),
(27, 28, 11, 'completed', '2023-04-15 18:00:00+00', '2023-04-17 22:00:00+00'),
(28, 24, 10, 'completed', '2023-04-16 19:00:00+00', '2023-04-18 23:00:00+00'),
(28, 29, 11, 'completed', '2023-04-17 20:00:00+00', '2023-04-19 08:00:00+00'),
(29, 25, 10, 'completed', '2023-04-18 21:00:00+00', '2023-04-20 09:00:00+00'),
(29, 30, 11, 'completed', '2023-04-19 22:00:00+00', '2023-04-21 10:00:00+00'),
(30, 26, 11, 'completed', '2023-04-20 23:00:00+00', '2023-04-22 11:00:00+00'),
(30, 31, 12, 'completed', '2023-04-21 08:00:00+00', '2023-04-23 12:00:00+00'),
(16, 32, 12, 'completed', '2023-04-22 09:00:00+00', '2023-04-24 13:00:00+00'),
(17, 33, 12, 'completed', '2023-04-23 10:00:00+00', '2023-04-25 14:00:00+00'),
(18, 34, 12, 'completed', '2023-04-24 11:00:00+00', '2023-04-26 15:00:00+00'),
(19, 35, 12, 'completed', '2023-04-25 12:00:00+00', '2023-04-27 16:00:00+00'),
(20, 36, 13, 'completed', '2023-04-26 13:00:00+00', '2023-04-28 17:00:00+00'),
(21, 37, 13, 'completed', '2023-04-27 14:00:00+00', '2023-04-29 18:00:00+00'),
(22, 38, 13, 'completed', '2023-04-28 15:00:00+00', '2023-04-30 19:00:00+00'),
(23, 39, 13, 'completed', '2023-04-29 16:00:00+00', '2023-05-01 20:00:00+00'),
(24, 40, 13, 'completed', '2023-04-30 17:00:00+00', '2023-05-02 21:00:00+00'),
(25, 41, 14, 'completed', '2023-05-01 18:00:00+00', '2023-05-03 22:00:00+00'),
(26, 42, 14, 'completed', '2023-05-02 19:00:00+00', '2023-05-04 23:00:00+00'),
(27, 43, 14, 'completed', '2023-05-03 20:00:00+00', '2023-05-05 08:00:00+00'),
(28, 44, 14, 'completed', '2023-05-04 21:00:00+00', '2023-05-06 09:00:00+00'),
(29, 45, 14, 'completed', '2023-05-05 22:00:00+00', '2023-05-07 10:00:00+00'),
(30, 46, 15, 'completed', '2023-05-06 23:00:00+00', '2023-05-08 11:00:00+00'),
(16, 47, 15, 'completed', '2023-05-07 08:00:00+00', '2023-05-09 12:00:00+00'),
(17, 48, 15, 'completed', '2023-05-08 09:00:00+00', '2023-05-10 13:00:00+00'),
(18, 49, 15, 'completed', '2023-05-09 10:00:00+00', '2023-05-11 14:00:00+00'),
(19, 50, 15, 'completed', '2023-05-10 11:00:00+00', '2023-05-12 15:00:00+00');

INSERT INTO reviews (booking_id, service_id, freelancer_id, reviewer_id, rating, comment, created_at) VALUES
-- Reviews for Web Development services (Freelancer 6)
(1, 1, 6, 16, 5, 'Excellent website development!', '2023-03-26 16:00:00+00'),
(3, 2, 6, 17, 5, 'API integration worked perfectly', '2023-03-28 18:00:00+00'),
(5, 3, 6, 18, 5, 'Database design was flawless', '2023-03-30 20:00:00+00'),
(7, 4, 6, 19, 4, 'E-commerce site works well', '2023-04-01 22:00:00+00'),
(9, 5, 6, 20, 3, 'CMS setup took longer than expected', '2023-04-03 08:00:00+00'),

-- Reviews for Graphic Design services (Freelancer 7)
(2, 7, 7, 16, 4, 'Great logo design, very creative', '2023-03-27 17:00:00+00'),
(4, 8, 7, 17, 4, 'Good branding work', '2023-03-29 19:00:00+00'),
(6, 9, 7, 18, 3, 'Business cards were okay', '2023-03-31 21:00:00+00'),
(8, 10, 7, 19, 5, 'Amazing packaging design', '2023-04-02 23:00:00+00'),

-- Reviews for Content Writing services (Freelancer 8)
(10, 11, 8, 20, 4, 'Well-written blog article', '2023-04-04 09:00:00+00'),
(11, 12, 8, 21, 5, 'Perfect website copy', '2023-04-05 10:00:00+00'),
(13, 13, 8, 22, 3, 'Product descriptions were fine', '2023-04-07 12:00:00+00'),
(15, 14, 8, 23, 4, 'Good press release', '2023-04-09 14:00:00+00'),
(17, 15, 8, 24, 3, 'Editing was decent', '2023-04-11 16:00:00+00'),

-- Reviews for Digital Marketing services (Freelancer 9)
(12, 17, 9, 21, 4, 'Great SEO audit', '2023-04-06 11:00:00+00'),
(14, 18, 9, 22, 5, 'Google Ads setup was perfect', '2023-04-08 13:00:00+00'),
(16, 19, 9, 23, 5, 'Excellent social media strategy', '2023-04-10 15:00:00+00'),
(18, 20, 9, 24, 4, 'Email campaign worked well', '2023-04-12 17:00:00+00'),
(19, 16, 9, 25, 5, 'Market research was thorough', '2023-04-13 18:00:00+00'),

-- Reviews for Business Consulting services (Freelancer 10)
(20, 21, 10, 25, 4, 'Business plan was well-written', '2023-04-14 19:00:00+00'),
(21, 22, 10, 26, 5, 'Financial model was perfect', '2023-04-15 20:00:00+00'),
(22, 23, 10, 26, 4, 'Great consultation session', '2023-04-16 21:00:00+00'),
(23, 24, 10, 27, 3, 'Pitch deck was okay', '2023-04-17 22:00:00+00'),
(24, 25, 10, 27, 5, 'SWOT analysis was excellent', '2023-04-18 23:00:00+00'),

-- Reviews for Education services (Freelancer 11)
(25, 26, 11, 28, 4, 'Math tutoring helped a lot', '2023-04-19 08:00:00+00'),
(26, 27, 11, 28, 5, 'English tutoring was perfect', '2023-04-20 09:00:00+00'),
(27, 28, 11, 29, 4, 'Test prep was helpful', '2023-04-21 10:00:00+00'),
(28, 29, 11, 29, 3, 'College counseling was decent', '2023-04-22 11:00:00+00'),
(29, 30, 11, 30, 5, 'Language tutoring was amazing', '2023-04-23 12:00:00+00'),

-- Reviews for Photography services (Freelancer 12)
(30, 31, 12, 30, 4, 'Portrait session went well', '2023-04-24 13:00:00+00'),
(31, 32, 12, 16, 5, 'Product photos were excellent', '2023-04-25 14:00:00+00'),
(32, 33, 12, 17, 4, 'Event coverage was good', '2023-04-26 15:00:00+00'),
(33, 34, 12, 18, 3, 'Photo editing was okay', '2023-04-27 16:00:00+00'),
(34, 35, 12, 19, 5, 'Real estate photos were perfect', '2023-04-28 17:00:00+00'),

-- Reviews for Video Production services (Freelancer 13)
(35, 36, 13, 20, 4, 'Video editing was great', '2023-04-29 18:00:00+00'),
(36, 37, 13, 21, 5, 'Podcast editing was excellent', '2023-04-30 19:00:00+00'),
(37, 38, 13, 22, 4, 'Color correction was good', '2023-05-01 20:00:00+00'),
(38, 39, 13, 23, 3, 'Audio cleanup was decent', '2023-05-02 21:00:00+00'),
(39, 40, 13, 24, 5, 'Motion graphics were amazing', '2023-05-03 22:00:00+00'),

-- Reviews for Translation services (Freelancer 14)
(40, 41, 14, 25, 4, 'Document translation was good', '2023-05-04 23:00:00+00'),
(41, 42, 14, 26, 5, 'Website translation was perfect', '2023-05-05 08:00:00+00'),
(42, 43, 14, 27, 4, 'Certified translation was great', '2023-05-06 09:00:00+00'),
(43, 44, 14, 28, 3, 'Live interpretation was okay', '2023-05-07 10:00:00+00'),
(44, 45, 14, 29, 5, 'Proofreading was excellent', '2023-05-08 11:00:00+00'),

-- Reviews for Data Analysis services (Freelancer 15)
(45, 46, 15, 30, 4, 'Data analysis was helpful', '2023-05-09 12:00:00+00'),
(46, 47, 15, 16, 5, 'Excel dashboard was perfect', '2023-05-10 13:00:00+00'),
(47, 48, 15, 17, 4, 'Survey analysis was good', '2023-05-11 14:00:00+00'),
(48, 49, 15, 18, 3, 'SQL querying was decent', '2023-05-12 15:00:00+00'),
(49, 50, 15, 19, 5, 'Data visualization was amazing', '2023-05-13 16:00:00+00');

INSERT INTO messages (sender_id, receiver_id, content, sent_at, is_read) VALUES
(16, 6, 'Hi, I need a website for my business', '2023-03-23 11:05:00+00', true),
(6, 16, 'Sure, what kind of website do you need?', '2023-03-23 11:10:00+00', true),
(17, 6, 'Can you help with API integration?', '2023-03-25 13:05:00+00', true),
(6, 17, 'Yes, what systems need to be connected?', '2023-03-25 13:15:00+00', true),
(18, 6, 'Need database design help', '2023-03-27 15:05:00+00', true),
(6, 18, 'What database system are you using?', '2023-03-27 15:20:00+00', true),
(19, 6, 'Looking for e-commerce site', '2023-03-29 17:05:00+00', true),
(6, 19, 'What products will you be selling?', '2023-03-29 17:25:00+00', true),
(20, 6, 'Need CMS setup', '2023-03-31 19:05:00+00', true),
(6, 20, 'WordPress or another platform?', '2023-03-31 19:30:00+00', true),
(16, 7, 'I need a logo designed', '2023-03-24 12:05:00+00', true),
(7, 16, 'Do you have any design preferences?', '2023-03-24 12:15:00+00', true),
(17, 7, 'Looking for brand identity', '2023-03-26 14:05:00+00', true),
(7, 17, 'What colors represent your brand?', '2023-03-26 14:20:00+00', true),
(18, 7, 'Need business cards', '2023-03-28 16:05:00+00', true),
(7, 18, 'How many cards do you need?', '2023-03-28 16:25:00+00', true),
(19, 7, 'Looking for social media kit', '2023-03-30 18:05:00+00', true),
(7, 19, 'Which platforms do you use?', '2023-03-30 18:30:00+00', true),
(20, 7, 'Need packaging design', '2023-04-01 20:05:00+00', true),
(7, 20, 'What product is this for?', '2023-04-01 20:35:00+00', true),
(21, 8, 'Need blog article written', '2023-04-02 21:05:00+00', true),
(8, 21, 'What topic should I write about?', '2023-04-02 21:20:00+00', true),
(22, 8, 'Looking for product descriptions', '2023-04-04 23:05:00+00', true),
(8, 22, 'How many products do you have?', '2023-04-04 23:25:00+00', true),
(23, 8, 'Need press release', '2023-04-06 09:05:00+00', true),
(8, 23, 'What is the announcement about?', '2023-04-06 09:30:00+00', true),
(24, 8, 'Looking for editing service', '2023-04-08 11:05:00+00', true),
(8, 24, 'How long is the document?', '2023-04-08 11:35:00+00', true),
(25, 9, 'Need SEO audit', '2023-04-10 13:05:00+00', true),
(9, 25, 'What is your website URL?', '2023-04-10 13:20:00+00', true),
(26, 9, 'Looking for Google Ads setup', '2023-04-12 15:05:00+00', true),
(9, 26, 'What is your budget?', '2023-04-12 15:25:00+00', true),
(27, 9, 'Need market research', '2023-04-14 17:05:00+00', true),
(9, 27, 'What industry are you in?', '2023-04-14 17:30:00+00', true),
(28, 10, 'Looking for business plan', '2023-04-15 18:05:00+00', true),
(10, 28, 'What type of business?', '2023-04-15 18:20:00+00', true),
(29, 10, 'Need financial model', '2023-04-17 20:05:00+00', true),
(10, 29, 'What time period should I project?', '2023-04-17 20:25:00+00', true),
(30, 10, 'Looking for SWOT analysis', '2023-04-19 22:05:00+00', true),
(10, 30, 'What are your business goals?', '2023-04-19 22:30:00+00', true),
(16, 11, 'Need math tutoring', '2023-04-20 23:05:00+00', true),
(11, 16, 'What level of math?', '2023-04-20 23:20:00+00', true),
(17, 11, 'Looking for college counseling', '2023-04-22 09:05:00+00', true),
(11, 17, 'What schools are you considering?', '2023-04-22 09:25:00+00', true),
(18, 12, 'Need portrait session', '2023-04-24 11:05:00+00', true),
(12, 18, 'What is the occasion?', '2023-04-24 11:30:00+00', true),
(19, 12, 'Looking for real estate photos', '2023-04-28 15:05:00+00', true),
(12, 19, 'How many properties?', '2023-04-28 15:25:00+00', true),
(20, 13, 'Need podcast editing', '2023-04-30 17:05:00+00', true),
(13, 20, 'How many episodes?', '2023-04-30 17:30:00+00', true);

INSERT INTO notifications (user_id, message, is_read, created_at) VALUES
(6, 'New booking received from Client One', true, '2023-03-23 11:01:00+00'),
(16, 'Your booking with John Developer has been confirmed', true, '2023-03-23 11:30:00+00'),
(7, 'New booking received from Client One', true, '2023-03-24 12:01:00+00'),
(16, 'Your booking with Sarah Designer has been confirmed', true, '2023-03-24 12:30:00+00'),
(6, 'New booking received from Client Two', true, '2023-03-25 13:01:00+00'),
(17, 'Your booking with John Developer has been confirmed', true, '2023-03-25 13:30:00+00'),
(7, 'New booking received from Client Two', true, '2023-03-26 14:01:00+00'),
(17, 'Your booking with Sarah Designer has been confirmed', true, '2023-03-26 14:30:00+00'),
(6, 'New booking received from Client Three', true, '2023-03-27 15:01:00+00'),
(18, 'Your booking with John Developer has been confirmed', true, '2023-03-27 15:30:00+00'),
(7, 'New booking received from Client Three', true, '2023-03-28 16:01:00+00'),
(18, 'Your booking with Sarah Designer has been confirmed', true, '2023-03-28 16:30:00+00'),
(6, 'New booking received from Client Four', true, '2023-03-29 17:01:00+00'),
(19, 'Your booking with John Developer has been confirmed', true, '2023-03-29 17:30:00+00'),
(7, 'New booking received from Client Four', true, '2023-03-30 18:01:00+00'),
(19, 'Your booking with Sarah Designer has been confirmed', true, '2023-03-30 18:30:00+00'),
(6, 'New booking received from Client Five', true, '2023-03-31 19:01:00+00'),
(20, 'Your booking with John Developer has been confirmed', true, '2023-03-31 19:30:00+00'),
(8, 'New booking received from Client Five', true, '2023-04-01 20:01:00+00'),
(20, 'Your booking with Mike Writer has been confirmed', true, '2023-04-01 20:30:00+00'),
(8, 'New booking received from Client Six', true, '2023-04-02 21:01:00+00'),
(21, 'Your booking with Mike Writer has been confirmed', true, '2023-04-02 21:30:00+00'),
(9, 'New booking received from Client Six', true, '2023-04-03 22:01:00+00'),
(21, 'Your booking with Emma Marketer has been confirmed', true, '2023-04-03 22:30:00+00'),
(8, 'New booking received from Client Seven', true, '2023-04-04 23:01:00+00'),
(22, 'Your booking with Mike Writer has been confirmed', true, '2023-04-04 23:30:00+00'),
(9, 'New booking received from Client Seven', true, '2023-04-05 08:01:00+00'),
(22, 'Your booking with Emma Marketer has been confirmed', true, '2023-04-05 08:30:00+00'),
(8, 'New booking received from Client Eight', true, '2023-04-06 09:01:00+00'),
(23, 'Your booking with Mike Writer has been confirmed', true, '2023-04-06 09:30:00+00'),
(9, 'New booking received from Client Eight', true, '2023-04-07 10:01:00+00'),
(23, 'Your booking with Emma Marketer has been confirmed', true, '2023-04-07 10:30:00+00'),
(8, 'New booking received from Client Nine', true, '2023-04-08 11:01:00+00'),
(24, 'Your booking with Mike Writer has been confirmed', true, '2023-04-08 11:30:00+00'),
(9, 'New booking received from Client Nine', true, '2023-04-09 12:01:00+00'),
(24, 'Your booking with Emma Marketer has been confirmed', true, '2023-04-09 12:30:00+00'),
(10, 'New booking received from Client Ten', true, '2023-04-11 14:01:00+00'),
(25, 'Your booking with David Consultant has been confirmed', true, '2023-04-11 14:30:00+00'),
(11, 'New booking received from Client Ten', true, '2023-04-13 16:01:00+00'),
(26, 'Your booking with Lisa Tutor has been confirmed', true, '2023-04-13 16:30:00+00'),
(10, 'New booking received from Client Eleven', true, '2023-04-15 18:01:00+00'),
(27, 'Your booking with David Consultant has been confirmed', true, '2023-04-15 18:30:00+00'),
(11, 'New booking received from Client Eleven', true, '2023-04-17 20:01:00+00'),
(28, 'Your booking with Lisa Tutor has been confirmed', true, '2023-04-17 20:30:00+00'),
(10, 'New booking received from Client Twelve', true, '2023-04-19 22:01:00+00'),
(29, 'Your booking with David Consultant has been confirmed', true, '2023-04-19 22:30:00+00'),
(11, 'New booking received from Client Twelve', true, '2023-04-21 10:01:00+00'),
(30, 'Your booking with Lisa Tutor has been confirmed', true, '2023-04-21 10:30:00+00'),
(12, 'New booking received from Client Thirteen', true, '2023-04-23 12:01:00+00'),
(16, 'Your booking with James Photographer has been confirmed', true, '2023-04-23 12:30:00+00');

INSERT INTO transactions (booking_id, freelancer_id, client_id, service_id, amount, platform_fee, transaction_date, payment_status, payment_method) VALUES
(1, 6, 16, 1, 500.00, 50.00, '2023-03-25 15:30:00+00', 'completed', 'credit_card'),
(2, 7, 16, 7, 150.00, 15.00, '2023-03-26 16:30:00+00', 'completed', 'paypal'),
(3, 6, 17, 2, 300.00, 30.00, '2023-03-27 17:30:00+00', 'completed', 'credit_card'),
(4, 7, 17, 8, 350.00, 35.00, '2023-03-28 18:30:00+00', 'completed', 'paypal'),
(5, 6, 18, 3, 400.00, 40.00, '2023-03-29 19:30:00+00', 'completed', 'credit_card'),
(6, 7, 18, 9, 100.00, 10.00, '2023-03-30 20:30:00+00', 'completed', 'paypal'),
(7, 6, 19, 4, 600.00, 60.00, '2023-03-31 21:30:00+00', 'completed', 'credit_card'),
(8, 7, 19, 10, 300.00, 30.00, '2023-04-01 22:30:00+00', 'completed', 'paypal'),
(9, 6, 20, 5, 250.00, 25.00, '2023-04-02 23:30:00+00', 'completed', 'credit_card'),
(10, 8, 20, 11, 80.00, 8.00, '2023-04-03 08:30:00+00', 'completed', 'paypal'),
(11, 8, 21, 12, 120.00, 12.00, '2023-04-04 09:30:00+00', 'completed', 'credit_card'),
(12, 9, 21, 17, 200.00, 20.00, '2023-04-05 10:30:00+00', 'completed', 'paypal'),
(13, 8, 22, 13, 50.00, 5.00, '2023-04-06 11:30:00+00', 'completed', 'credit_card'),
(14, 9, 22, 18, 250.00, 25.00, '2023-04-07 12:30:00+00', 'completed', 'paypal'),
(15, 8, 23, 14, 150.00, 15.00, '2023-04-08 13:30:00+00', 'completed', 'credit_card'),
(16, 9, 23, 19, 300.00, 30.00, '2023-04-09 14:30:00+00', 'completed', 'paypal'),
(17, 8, 24, 15, 70.00, 7.00, '2023-04-10 15:30:00+00', 'completed', 'credit_card'),
(18, 9, 24, 20, 180.00, 18.00, '2023-04-11 16:30:00+00', 'completed', 'paypal'),
(19, 9, 25, 16, 200.00, 20.00, '2023-04-12 17:30:00+00', 'completed', 'credit_card'),
(20, 10, 25, 21, 400.00, 40.00, '2023-04-13 18:30:00+00', 'completed', 'paypal'),
(21, 10, 26, 22, 350.00, 35.00, '2023-04-14 19:30:00+00', 'completed', 'credit_card'),
(22, 11, 26, 27, 40.00, 4.00, '2023-04-15 20:30:00+00', 'completed', 'paypal'),
(23, 10, 27, 23, 100.00, 10.00, '2023-04-16 21:30:00+00', 'completed', 'credit_card'),
(24, 11, 27, 28, 40.00, 4.00, '2023-04-17 22:30:00+00', 'completed', 'paypal'),
(25, 10, 28, 24, 300.00, 30.00, '2023-04-18 23:30:00+00', 'completed', 'credit_card'),
(26, 11, 28, 29, 60.00, 6.00, '2023-04-19 08:30:00+00', 'completed', 'paypal'),
(27, 10, 29, 25, 200.00, 20.00, '2023-04-20 09:30:00+00', 'completed', 'credit_card'),
(28, 11, 29, 30, 45.00, 4.50, '2023-04-21 10:30:00+00', 'completed', 'paypal'),
(29, 11, 30, 26, 40.00, 4.00, '2023-04-22 11:30:00+00', 'completed', 'credit_card'),
(30, 12, 30, 31, 150.00, 15.00, '2023-04-23 12:30:00+00', 'completed', 'paypal'),
(31, 12, 16, 32, 120.00, 12.00, '2023-04-24 13:30:00+00', 'completed', 'credit_card'),
(32, 12, 17, 33, 300.00, 30.00, '2023-04-25 14:30:00+00', 'completed', 'paypal'),
(33, 12, 18, 34, 50.00, 5.00, '2023-04-26 15:30:00+00', 'completed', 'credit_card'),
(34, 12, 19, 35, 180.00, 18.00, '2023-04-27 16:30:00+00', 'completed', 'paypal'),
(35, 13, 20, 36, 75.00, 7.50, '2023-04-28 17:30:00+00', 'completed', 'credit_card'),
(36, 13, 21, 37, 60.00, 6.00, '2023-04-29 18:30:00+00', 'completed', 'paypal'),
(37, 13, 22, 38, 90.00, 9.00, '2023-04-30 19:30:00+00', 'completed', 'credit_card'),
(38, 13, 23, 39, 40.00, 4.00, '2023-05-01 20:30:00+00', 'completed', 'paypal'),
(39, 13, 24, 40, 120.00, 12.00, '2023-05-02 21:30:00+00', 'completed', 'credit_card'),
(40, 14, 25, 41, 80.00, 8.00, '2023-05-03 22:30:00+00', 'completed', 'paypal'),
(41, 14, 26, 42, 50.00, 5.00, '2023-05-04 23:30:00+00', 'completed', 'credit_card'),
(42, 14, 27, 43, 100.00, 10.00, '2023-05-05 08:30:00+00', 'completed', 'paypal'),
(43, 14, 28, 44, 60.00, 6.00, '2023-05-06 09:30:00+00', 'completed', 'credit_card'),
(44, 14, 29, 45, 45.00, 4.50, '2023-05-07 10:30:00+00', 'completed', 'paypal'),
(45, 15, 30, 46, 150.00, 15.00, '2023-05-08 11:30:00+00', 'completed', 'credit_card'),
(46, 15, 16, 47, 200.00, 20.00, '2023-05-09 12:30:00+00', 'completed', 'paypal'),
(47, 15, 17, 48, 120.00, 12.00, '2023-05-10 13:30:00+00', 'completed', 'credit_card'),
(48, 15, 18, 49, 90.00, 9.00, '2023-05-11 14:30:00+00', 'completed', 'paypal'),
(49, 15, 19, 50, 110.00, 11.00, '2023-05-12 15:30:00+00', 'completed', 'credit_card');