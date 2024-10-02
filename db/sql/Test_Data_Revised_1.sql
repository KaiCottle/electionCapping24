-- Insert values in alphabetical order
INSERT INTO Schools (Sname) VALUES 
    ('School of Communication and the Arts'),
    ('School of Computer Science and Mathematics'),
    ('School of Liberal Arts'),
    ('School of Management'),
    ('School of Professional Programs'),
    ('School of Science'),
    ('School of Social and Behavioural Sciences');

-- Insert into People table
INSERT INTO People (Fname, Lname) VALUES 
    ( 'Chris', 'Algozzine'),
    ( 'Joseph', 'Kirtland'),
    ( 'Bowu', 'Zhang'),
    ( 'Casimer', 'DeCusatis'),
    ( 'Eitel', 'Lauria');

-- Inserting all the committees
INSERT INTO Committees (Committee_Name) VALUES
    ('Academic Affairs Committee (AAC)'),
    ('Academic Standards'),
    ('Ad hoc Term Faculty Committee'),
    ('Ad hoc Handbook Revision Committee'),
    ('Assessment'),
    ('AY 17-18 the Ad Hoc Governance'),
    ('Campus Life Committee'),
    ('Campus Sustainability Advisory Committee (CSAC)'),
    ('Collegewide Internship Task Force'),
    ('Common Read'),
    ('Core and Liberal Studies'),
    ('CURSCA planning committee'),
    ('Curriculum'),
    ('DEIB'),
    ('Department Chair'),
    ('Diversity Council'),
    ('Faculty Affairs Committee (FAC)'),
    ('Faculty Research & Sabbaticals'),
    ('Fellowship committee'),
    ('Graduate Council'),
    ('Grievance'),
    ('Hiring Committee'),
    ('Honors Council'),
    ('Institutional Review Board (IRB)'),
    ('Library'),
    ('LMS Faculty Task Force'),
    ('Numerous CAS review committees'),
    ('Presidential Inauguration Committee'),
    ('Priorities & Resources Committee (PRC)'),
    ('Professional Programs'),
    ('Rank & Tenure'),
    ('Retention and Interfaith'),
    ('RSS Chair'),
    ('School of Science Safety Committee'),
    ('Secretary of Faculty'),
    ('Social Justice Conference'),
    ('SOM: strategic planning committee'),
    ('Standing Committee on Athletics'),
    ('Strategic Plans Project Advisory Committee'),
    ('Student conduct panel hearing officer'),
    ('Survey Committee'),
    ('Title IX'),
    ('UPC Chair'),
    ('Various hiring/staffing search committees'),
    ('Veterans affair committee'),
    ('Any of the Middle States working committees'),
    ('Any of the Strategic Planning committees');

-- Insert into Faculty table
INSERT INTO Faculty (FID, Email, SchoolID, IsHidden, PrefName, URL, TheStatement, LastUpdated) VALUES 
    (1, 'Chris.Algozzine@marist.edu', 2, false, 'Chris Algozzine', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I choose to serve our community any way I can for many reasons. It started when I was a Boy Scout, and was forged forever in my ethos after I arrived here as a Freshman in 1985 to work on my bachelor’s degree, where I also joined service clubs like campus ministry, and was taught about service to our community by the faculty and Marist brothers. I went on to have a career at IBM and took every chance to serve the communities in which IBM did business. I served for a brief time as the Senior Location Executive at the Poughkeepsie IBM Site, which is a position serving as the spokesperson to the community and working with community non-profits. I enjoyed this work, and when I joined the Marist faculty in 1995, was immediately drawn to the Center for Civic Engagement. Granted a fellowship to study community based learning (CBL) practices with Dr. Gaeke and a cohort of our colleagues, I put CBL into practice in my courses, especially the Capping experience course. I’m proud of the service I bring to the Marist community and feel that in 9 short years I’ve embedded myself into opportunities to give back to my colleagues, our students, the college, and the community at large. I would be honored to serve as Chair of the Faculty, and hope you will vote for me.',
     '2024-02-05 16:31:28'),

    (2, 'Joe.Kirtland@marist.edu', 2, false, 'Joseph Kirtland', 'http://www.marist.edu/{school}/faculty/{fn-ln}',
     'I am a firm believer in faculty-driven shared governance guided by the Faculty Handbook. But for that to work, we need to have a strong faculty voice driven predominantly by dedicated service on faculty and other committees. Through working on elected and appointed faculty committees, the faculty can have a significant and meaningful impact on college academics, college policies, campus environment, and the general direction of the college.',
     '2024-03-19 07:34:25'),

    (3, 'Bowu.Zhang@marist.edu', 2, false, 'Bowu Zhang', 'http://www.marist.edu/{school}/faculty/{fn-ln}',
     "I have been the faculty advisor for Women-In-Technology Club at Marist for years. I enjoyed working with colleague and students to promote women\'s participation in Computer Science (CS) through various networking activities. I welcome any thoughts to attract more women to CS.",
     '2024-03-19 08:49:36'),

    (4, 'Casimer.DeCusatis@marist.edu', 2, false, 'Casimer Decusatis', 'http://www.marist.edu/{school}/faculty/{fn-ln}',
     "Ive found that service is a great way to interact with people from other parts of the college, and get a different perspective on our shared issues and challenges. In addition to my past service on Academic Standards, Core and Liberal Studies, and the Institutional Review Board, I\'ve previously served on the President\'s Faculty Climate Committee and the Technology Committee Working Group on Data Center Strategy. I feel that these experiences have allowed me to make Marist a better place for students, faculty, and staff alike. I\'m always interested in finding new ways to help serve our campus community, and would appreciate the opportunity to stay involved in whatever capacity is needed.",
     '2024-03-19 16:53:35'),

    (5, 'Eitel.Lauria@marist.edu', 5, false, 'Eitel Lauria', 'http://example.com/eitel_lauria',
     "I have chaired the AAC and served as the Vice Chair of FAC during the pandemic. I currently chair the faculty search committee in my department. I served on the presidential search committee, the CIO\'s search committee, the previous middle-states committee, and co-chaired one of the strategic plan working groups. I have helped hire and mentored most of the faculty in my department through tenure and promotion. I will be on sabbatical in Spring 2025.",
     '2024-03-19 17:12:37');
