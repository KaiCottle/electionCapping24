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
    ( 'Eitel', 'Lauria'),
    ('Luis', 'Espinasa'),
    ('Tracey', 'McGrail'),
    ('Megan', 'Dennis'),
    ('Jocelyn', 'Nadeau'),
    ('Andrei', 'Buckareff'),
    ('Joshua', 'Kotzin'),
    ('Annamaria', 'Maciocia'),
    ('Brian', 'Loh'),
    ('Melissa', 'Gaeke'),
    ('Jennifer', 'Finn'),
    ('Jeff', 'Bass'),
    ('Joseph', 'Campisi'),
    ('Elizabeth', 'Reid'),
    ('Sally', 'Dwyer-McNulty'),
    ('John Morrison', 'Galbraith'),
    ('Henry', 'Pratt'),
    ('Patricia', 'Ferrer-Medina'),
    ('Lynn M.', 'Eckert'),
    ('Joanna', 'D''Avanzo'),
    ('Kristin', 'Bayer'),
    ('Jessica', 'Boscarino'),
    ('Georganna', 'Ulary'),
    ('Matt', 'Andrews'),
    ('Anne', 'Bertrand-Dewsnap'),
    ('Qihao', 'Ji'),
    ('M. Marina', 'Melita'),
    ('Sasha', 'Biro'),
    ('Rebecca', 'Brown'),
    ('Robyn L.', 'Rosen'),
    ('Eileen', 'Curley'),
    ('Lisa R.', 'Neilson'),
    ('Tommy', 'Zurhellen'),
    ('Lea', 'Graham'),
    ('Jamie', 'Perillo'),
    ('Stephanie', 'Conover'),
    ('Daria', 'Hanssen'),
    ('Kavous', 'Ardalan'),
    ('Julie', 'Raines'),
    ('Jennifer', 'Robinette'),
    ('Jason', 'Trent'),
    ('Thomas M.', 'Madden'),
    ('Kuangnen', 'Cheng'),
    ('Byunghoon', 'Jin'),
    ('Ryan', 'Kinlaw'),
    ('Yuwei', 'Wang');

-- Inserting all the committees
INSERT INTO Committees (Cname) VALUES
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
    ('Retention Committee'),
    ('Sustainability Action Planning Committee'),
    ('Master Plan Steering Committee'),
    ('Athletics Strategic Planning Committee'),
    ('Marist + AI'),
    ('Any of the Strategic Planning committees');

INSERT INTO Faculty (FID, Email, SchoolID, IsHidden, PrefName, URL, TheStatement, LastUpdated) VALUES 
    (1, 'Chris.Algozzine@marist.edu', 2, false, 'Chris Algozzine', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I choose to serve our community any way I can for many reasons. It started when I was a Boy Scout, and was forged forever in my ethos after I arrived here as a Freshman in 1985 to work on my bachelor’s degree, where I also joined service clubs like campus ministry, and was taught about service to our community by the faculty and Marist brothers. I went on to have a career at IBM and took every chance to serve the communities in which IBM did business. I served for a brief time as the Senior Location Executive at the Poughkeepsie IBM Site, which is a position serving as the spokesperson to the community and working with community non-profits. I enjoyed this work, and when I joined the Marist faculty in 1995, was immediately drawn to the Center for Civic Engagement. Granted a fellowship to study community based learning (CBL) practices with Dr. Gaeke and a cohort of our colleagues, I put CBL into practice in my courses, especially the Capping experience course. I’m proud of the service I bring to the Marist community and feel that in 9 short years I’ve embedded myself into opportunities to give back to my colleagues, our students, the college, and the community at large. I would be honored to serve as Chair of the Faculty, and hope you will vote for me.',
     '2024-02-05 16:31:28'),

    (2, 'Joe.Kirtland@marist.edu', 2, false, 'Joseph Kirtland', 'http://www.marist.edu/{school}/faculty/{fn-ln}',
     'I am a firm believer in faculty-driven shared governance guided by the Faculty Handbook. But for that to work, we need to have a strong faculty voice driven predominantly by dedicated service on faculty and other committees. Through working on elected and appointed faculty committees, the faculty can have a significant and meaningful impact on college academics, college policies, campus environment, and the general direction of the college.',
     '2024-03-19 07:34:25'),

    (3, 'Bowu.Zhang@marist.edu', 2, false, 'Bowu Zhang', 'http://www.marist.edu/{school}/faculty/{fn-ln}',
     'I have been the faculty advisor for Women-In-Technology Club at Marist for years. I enjoyed working with colleague and students to promote women''s participation in Computer Science (CS) through various networking activities. I welcome any thoughts to attract more women to CS.',
     '2024-03-19 08:49:36'),

    (4, 'Casimer.DeCusatis@marist.edu', 2, false, 'Casimer Decusatis', 'http://www.marist.edu/{school}/faculty/{fn-ln}',
     'Ive found that service is a great way to interact with people from other parts of the college, and get a different perspective on our shared issues and challenges. In addition to my past service on Academic Standards, Core and Liberal Studies, and the Institutional Review Board, I''ve previously served on the President''s Faculty Climate Committee and the Technology Committee Working Group on Data Center Strategy. I feel that these experiences have allowed me to make Marist a better place for students, faculty, and staff alike. I''m always interested in finding new ways to help serve our campus community, and would appreciate the opportunity to stay involved in whatever capacity is needed.',
     '2024-03-19 16:53:35'),

    (5, 'Eitel.Lauria@marist.edu', 5, false, 'Eitel Lauria', 'http://example.com/eitel_lauria',
     'I have chaired the AAC and served as the Vice Chair of FAC during the pandemic. I currently chair the faculty search committee in my department. I served on the presidential search committee, the CIO''s search committee, the previous middle-states committee, and co-chaired one of the strategic plan working groups. I have helped hire and mentored most of the faculty in my department through tenure and promotion. I will be on sabbatical in Spring 2025.',
     '2024-03-19 17:12:37'),

    (6, 'Luis.Espinasa@marist.edu', 6, false, 'Luis Espinasa', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I have been in Marist for 18 years. Have served in the Rank and Tenure committee once, and in the Grievance Committee as its Chair for two years.', 
     '2024-03-19 18:44:57'),

    (7, 'Tracey.McGrail@marist.edu', 2, false, 'Tracey McGrail', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I believe that faculty service is very important to the function of the college. In particular, while membership on the Rank and Tenure Committee is a heavy commitment (I was on when there were 13 candidates for tenure!), this group plays a critical role in evaluating faculty. If elected I will serve.', 
     '2024-03-21 15:12:53'),

    (8, 'Megan.Dennis@marist.edu', 6, false, 'Megan Dennis', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I am not comfortable serving on Rank & Tenure at this point in my career. As a recently-tenured faculty member, I have not yet had the opportunity to serve on a peer committee for tenure evaluation, and feel that I lack the experience necessary to fairly assess candidates from across the college as a member of R&T.', 
     '2024-03-27 13:22:33'),

    (9, 'Jocelyn.Nadeau@marist.edu', 6, false, 'Jocelyn Nadeau', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'Since I started in 2005, I have served on many campus wide, SoS, and departmental committees and spent considerable time devoted to service that is unique to laboratory science within my department. These service endeavors have all been rewarding and productive in their own way, but they have also negatively impacted my ability to advance my scholarship to where it needs to be to apply for promotion to full professor, especially in the past 5 years due to COVID-related and overall workload issues. So, I am asking for some consideration given that I have already served on two of the major elected committees since 2012. As soon as I was tenured and eligible after my probationary year, I was elected to the Rank and Tenure Committee in 2012 and served as its chair during the third year of my term (in only my 10th year at Marist). Right after my service sabbatical was over, I was elected to FAC where I served a 3-year term that spanned through summer 2020. I will be more than willing to serve on R&T again in the future, but I am asking for some mercy at this current time. Thank you.', 
     '2024-03-29 14:33:05'),

    (10, 'Andrei.Buckareff@marist.edu', 3, false, 'Andrei Buckareff', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I have enjoyed serving on Rank & Tenure, along with other committees. While it''s a lot of work, it is rewarding work. I am presently in my first year serving on the Faculty Research and Sabbaticals (which I have served on previously). I am presently chair of said committee. I am happy to serve on any committee.', 
     '2024-03-29 17:23:01'),

     (11, 'Joshua.Kotzin@marist.edu', 3, false, 'Joshua Kotzin', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I believe service is an important way for faculty to help the college fulfill its mission. As the Chair of the English Department (in which role I''ve served for more than a year), I have learned a lot about the institution as a whole and the ways faculty work fits into that bigger picture.', 
     '2024-03-29 18:36:28'),

    (12, 'Annamaria.Maciocia@marist.edu', 3, false, 'Annamaria Maciocia', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I am honored to serve the faculty, School of Liberal Arts, and the Marist community in any capacity. If elected, I will contribute my time and best effort to participate on FAC or AAC. As a term faculty member at Marist College since 1995, I have witnessed the diligent, selfless dedication of tenured faculty in these roles. It is with profound gratitude and respect for their service that I am motivated to serve. Additionally both FAC and AAC are vital to the integrity of shared governance; therefore, service at this responsibility of every eligible faculty member.', 
     '2024-03-29 23:45:04'),

    (13, 'Brian.Loh@marist.edu', 3, false, 'Brian Loh', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I am currently serving as acting honors director, and I''m a member of the Marist Mindfulness Collective, the Global Studies Committee, and the Interfaith Committee. As of writing (3/30/24) I am not seeking election as I have a kid coming end of May and will be on parental leave in spring ''25. I am open to serving in the future, but please consider someone who will be a little less distracted this time around!', 
     '2024-03-30 07:30:45'),

    (14, 'Melissa.Gaeke@marist.edu', 3, false, 'Melissa Gaeke', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I believe that service to a community is a vital component to a healthy system of governance and think that committees should reflect diverse and representative voices of the various constituencies that comprise the community. While full representation is not always possible, it is the responsibility of those who serve to make sure they are involved with those they represent so they are able to adequately represent their interests.', 
     '2024-03-30 09:34:53'),

    (15, 'Jennifer.Finn@marist.edu', 1, false, 'Jennifer Finn', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'For the last 5 years, I''ve served as Department Chair for the Fashion Design and Merchandising Program, where I''ve collaborated with faculty on several curriculum and assessment initiatives, served in an advisory role with faculty and administration members, and positioned myself as a leader & mentor to our part-time faculty members. I''m interested in serving as a member on the Faculty Affairs Committee because I believe the role of faculty shared governance is an extremely important one, and there are opportunities that exist for further defining roles, responsibilities, and development for Term faculty.', 
     '2024-03-30 10:35:16'),

    (16, 'Jeff.Bass@marist.edu', 1, false, 'Jeff Bass', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'Hello colleagues, besides being eligible, I am ready, willing, and able to serve on the Faculty Affairs Committee. I am one of the longest-serving term faculty, and in 2018-19 I chaired a committee that was instrumental in making term faculty eligible for FAC and AAC. In the past year, I have gone through a series of disciplinary measures designed to make me a better employee, teacher, and human being. I feel more capable than ever to represent your interests on the FAC, and I am eager to work with the new group of dynamic administrators managing the faculty and the college. I hope I can count on your vote, I won''t let you down.', 
     '2024-03-30 17:36:56'),

    (17, 'Joseph.Campisi@marist.edu', 3, false, 'Joseph Campisi', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I have served on a number of committees during my time here at Marist and am currently the co-chair of CSAC and on the Fellowship Committee (which works with Pat Taylor and students applying for things like Fulbrights, etc.). I view service to students, the college, and my faculty colleagues as important, and would gladly serve on any committee if so elected.', 
     '2024-03-31 11:42:26'),

    (18, 'Elizabeth.Reid@marist.edu', 2, false, 'Elizabeth Reid', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I enjoy working closely with students and faculty in clubs and committees. While serving on committees, I have formed professional relationships and collaborated with people across campus. Some committees I have been a member of include: the Campus Life Committee, the Celebration of Undergraduate Research, Scholarship & Creative Activity (CURSCA) Committee, and a committee charged with planning academic events around the inauguration of President Weinman. During the Middle States review, I served as a member of the Working Group on Standard VII: Governance, Leadership, and Administration for the reaccreditation of Marist College. I am also currently a Hearing Board Member. This year I have taken on the added responsibility of being a Co-Chair of the CURSCA committee. In this position, I work closely with faculty and staff to organize an event that provides a platform for students to showcase their work to the Marist community. Although I will be on sabbatical next Spring, I am looking forward to additional service opportunities in the future.', 
     '2024-03-31 21:26:07'),

    (19, 'Sally.Dwyer-McNulty@marist.edu', 3, false, 'Sally Dwyer-McNulty', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I value shared governance and working with faculty, students, staff, and administrators across campus.', 
     '2024-04-01 10:00:28'),

    (20, 'John.Morrison.Galbraith@marist.edu', 6, false, 'John Morrison Galbraith', 'http://www.marist.edu/{school}/faculty/{fn-ln}', 
     'I do not have a strong desire to be on committees. I do not think I am particularly good at it, and I feel my time and effort is better spent with teaching and research. However, I do believe in making Marist a better place, and I recognize the importance and value of faculty committees. Therefore, I have always served and will continue to serve, to the best of my ability on whatever committee I am on.', 
     '2024-04-01 10:00:28'),

    (21, 'henry.pratt@marist.edu', 3, false, 'Henry Pratt', 'http://www.marist.edu/school-of-science/faculty/henry-pratt', 
     'I would be willing to serve on an elected committee in the future, but in AY2024-25, I will be taking on Department Chair duty for the first time, as well as shepherding my department through our long-awaited program review. I would prefer not to have to do this and be on FAC initially.', 
     '2024-04-01 13:30:41'),

    (22, 'patricia.ferrer-medina@marist.edu', 2, false, 'Patricia Ferrer-Medina', 'http://www.marist.edu/arts/faculty/patricia-ferrer-medina', 
     'I am currently chair of my department as well as Director of Latin American and Caribbean Studies and Coordinator of Spanish Internships. Service is important and significant to me when I feel I am able to take on the responsibility and do it well.', 
     '2024-04-02 21:56:14'),

    (23, 'lynn.eckert@marist.edu', 3, false, 'Lynn M. Eckert', 'http://www.marist.edu/school-of-science/faculty/lynn-eckert', 
     'I see service as an important duty as a faculty member, and if elected, I will serve. In the past, I have served on AAC, FAC, and the Grievance Committee. In my view, under new leadership, the College has a historic opportunity to address structural and cultural issues that have impeded growth. Among those issues are concerns about workload, pay equity, and limited faculty resources for research and high-impact learning practices. At the same time, having served on these faculty-wide committees, I also believe that the College benefits when we hear from a wide variety of voices.', 
     '2024-04-02 21:57:44'),

    (24, 'joanna.davanzo@marist.edu', 1, false, 'Joanna D''Avanzo', 'http://www.marist.edu/arts/faculty/joanna-davanzo', 
     'Throughout my life, I''ve been guided by a simple belief: that lending a hand to others can truly make a difference. I grew up in a tight-knit community alongside my dad''s beloved neighborhood pharmacy. To me, it wasn''t just a business or where people came for medication; it was a place where people came for care and compassion. My dad was the driving force behind it all, always ready to step up and help out. Whether it was providing vital medication to AIDS patients when others turned them away or ensuring that UCP patients received their daily deliveries, he showed me what it means to make a difference. Working with him from a young age, I got to see firsthand how a little kindness can go a long way. It''s amazing how something as simple as a helping hand can bring a whole community together. Inspired by his example, I''ve continually sought to contribute to a greater cause. Whether mentoring through the Big Brother/Big Sister program, imparting knowledge to high school students through weekly advertising courses, or lending leadership to PTAs and junior and high school football organizations, I''ve always sought ways to make a difference. And I''ve learned that it''s not just about the impact on others—I''ve found personal growth and fulfillment in every service opportunity whether in my local community or at Marist. By breaking out of school/department silos and getting involved in college-wide committees, these endeavors not only afford me the chance to learn and grow but also enable me to connect with fellow members of the Marist community and form meaningful relationships with colleagues across diverse backgrounds and disciplines.', 
     '2024-04-02 22:53:33'),

    (25, 'kristin.bayer@marist.edu', 3, false, 'Kristin Bayer', 'http://www.marist.edu/school-of-science/faculty/kristin-bayer', 
     'I am currently in the second term as chair of the History department, overseeing our 5-year review. I am also the director of the Women''s, Gender, and Sexuality Studies program. I would prefer to serve on this committee after my 6 years of being chair is over.', 
     '2024-04-03 08:45:29'),

    (26, 'jessica.boscarino@marist.edu', 3, false, 'Jessica Boscarino', 'http://www.marist.edu/school-of-science/faculty/jessica-boscarino', 
     'As a current department Chair with a lot of recent service responsibilities, I respectfully request that people refrain from voting for me. Since I took over as Chair during COVID, and through my experience on the steering committee for the Strategic Plan, I have devoted a lot of time to service in the past few years. I am trying to achieve a better balance with my research agenda that has suffered as a result of this service. I prefer to serve at a time when I can devote my full energies to the task.', 
     '2024-04-03 08:55:54'),

    (27, 'georganna.ulary@marist.edu', 3, false, 'Georganna Ulary', 'http://www.marist.edu/school-of-science/faculty/georganna-ulary', 
     'I am currently serving on the PRC which has been a very interesting and rewarding experience. I still have 2 more years on this committee. Because the PRC committee meets every week, I''d prefer not to serve on another large campus-wide committee until after I''m finished serving on the PRC.', 
     '2024-04-03 10:44:25'),

    (28, 'matt.andrews@marist.edu', 3, false, 'Matt Andrews', 'http://www.marist.edu/school-of-science/faculty/matt-andrews', 
     'In my 24 years I have served on a variety of committees but not on FAC and I welcome that opportunity. I am also interested in serving on Grievance again, as it''s been several years.', 
     '2024-04-03 10:54:17'),

    (29, 'anne.bertrand-dewsnap@marist.edu', 1, false, 'Anne Bertrand-Dewsnap', 'http://www.marist.edu/arts/faculty/anne-bertrand-dewsnap', 
     'I started working at Marist as an adjunct over 20 years ago and I am now a Senior Lecturer in the Department of Art and Digital Media. I will be Chair of my department next year. So, you might consider giving me a year to acclimate to my new position...', 
     '2024-04-03 15:04:39'),

    (30, 'qihao.ji@marist.edu', 1, false, 'Qihao Ji', 'http://www.marist.edu/arts/faculty/qihao-ji', 
     'I study the role of self-transcendent emotions in human communication and wish to highlight my value in this line of research, as opposed to serving in FAC. I would advocate for thoughtful consideration of other candidates whose dedication to this role is matched by their enthusiasm and capability for it.', 
     '2024-04-03 15:05:33'),

    (31, 'Marina.Melita@marist.edu', 3, FALSE, 'M. Marina Melita', 'http://www.marist.edu/school/faculty/marina-melita', 
	 'While I am usually happy to serve Marist in any way that I can, I do not think I can do so at this time, and also do a good job. Right now, I teach 8 courses per year, serve on the Global Studies Advising Committee, as well as the Queer Trans Sub-Committee of the Diversity Council. I run the Italian program at Marist and serve as the Chair of the World Film Program. Beyond Marist, I have a book project in the works, and was recently elected as the President of the academic association for Italian studies; The American Association of Teachers of Italian. I fear that adding one more responsibility will hinder my ability to perform my current duties at the level that my students, colleagues, and community members deserve and expect from me. In the future, when I have wrapped up some of my current duties, I would be happy to serve on one of the standing committees for Marist.', 
	 '2024-04-04 18:30:08'),
	
	(32, 'Sasha.Biro@marist.edu', 3, FALSE, 'Sasha Biro', 'http://www.marist.edu/school/faculty/sasha-biro', 
	 'I am a Lecturer of Philosophy and Coordinator of the Diversity, Equity, Inclusion Workshop in First Year Seminar. I currently serve on the Retention Committee, and the Interfaith Committee. I am also a faculty advisor/editor to the Marist Undergraduate Philosophy Journal.', 
	 '2024-04-05 12:10:28'),
	
	(33, 'Rebecca.Brown@marist.edu', 1, FALSE, 'Rebecca Brown', 'http://www.marist.edu/school/faculty/rebecca-brown', 
	 'As a senior professional lecturer of Fashion Merchandising and the Faculty Advisor of MPorium at Marist (student run live retail laboratory located in Steel Plant) I collaborate often with other schools and departments across campus on special projects. I work closely with advancement on giving campaigns, worked with middle states committee, the Dean of SCA and SOM bringing product ideas to life from concept to execution. I am on the Marist Bookstore committee, along with many fashion program and school committees. I believe in the importance of service and collaborating with others to be a part of the solution and not the problem.', 
	 '2024-04-06 08:53:37'),
	
	(34, 'Robyn.Rosen@marist.edu', 1, FALSE, 'Robyn L. Rosen', 'http://www.marist.edu/school/faculty/robyn-rosen', 
	 'As a senior professional lecturer of Fashion Merchandising and the Faculty Advisor of MPorium at Marist (student run live retail laboratory located in Steel Plant) I collaborate often with other schools and departments across campus on special projects. I work closely with advancement on giving campaigns, worked with middle states committee, the Dean of SCA and SOM bringing product ideas to life from concept to execution. I am on the Marist Bookstore committee, along with many fashion program and school committees. I believe in the importance of service and collaborating with others to be a part of the solution and not the problem.', 
	 '2024-04-06 19:58:22'),
	
	(35, 'Eileen.Curley@marist.edu', 3, FALSE, 'Eileen Curley', 'http://www.marist.edu/school/faculty/eileen-curley', 
	 'While I would be happy to serve on campus-wide committees in the future as I have done in the past, I have just been appointed as the Academic Theatre Program Director and would like to be able to focus on the needs of the program, including restructuring some theatre processes & policies and mentoring a new hire in the program. I fully expect to continue to contribute to campus through numerous ongoing committees, but I would appreciate being passed over for this round of the major committees. And if you’d still like to vote for me, then thanks for the vote of confidence — I have been chair of English so I know that work intimately and work well (and happily) on logistics and editing. I am ultimately a theatre historian & designer at heart — I much prefer working & collaborating behind the scenes, digging into archives, and challenging audiences through art.', 
	 '2024-04-06 21:42:02'),
	
	(36, 'Lisa.Neilson@marist.edu', 3, FALSE, 'Lisa R. Neilson', 'http://www.marist.edu/school/faculty/lisa-neilson', 
	 'I believe that faculty service is very important to the function of the college. It strengthens our institution initiatives and can help foster a healthy and vibrant community. I have recently transitioned into a Lecturer position in the English Department. I am also the new Internship Director in our department with plans to extensively grow the internship program for English majors and minors. I look forward to settling into these positions in the upcoming academic year. Additionally, I am the Director of the Summer Pre-College Creative Writing Program.', 
	 '2024-04-07 11:07:19'),
	
	(37, 'Thomas.Zurhellen@marist.edu', 3, FALSE, 'Tommy Zurhellen', 'http://www.marist.edu/school/faculty/tommy-zurhellen', 
	 'Nobody does it better!', 
	 '2024-04-07 13:51:52'),
	
	(38, 'Lea.Graham@marist.edu', 3, FALSE, 'Lea Graham', 'http://www.marist.edu/school/faculty/lea-graham', 
	 'I do not wish to serve on campus-wide committees at this time. I am in the middle of several book projects and am busy supporting the new hires in the English Department and other department/school annual events. Thank you.', 
	 '2024-04-08 10:03:36'),
	
	(39, 'Jamie.Perillo@marist.edu', 1, FALSE, 'Jamie Perillo', 'http://www.marist.edu/school/faculty/jamie-perillo', 
	 'This is my 15th year at Marist. I welcome the opportunity to serve on the FAC and represent the Fashion Program, School of Communication, and the Arts and all faculty. I have served on the following committees: the Fashion Design Curriculum Committee, the SCA Inventory Committee, the Fashion Gallery & Archive Committee, and the Fashion Department Diversity and Inclusion Committee. I have also served on and chaired several search and peer review committees.', 
	 '2024-04-09 16:23:57'),
	
	(40, 'Stephanie.Conover@marist.edu', 1, FALSE, 'Stephanie Conover', 'http://www.marist.edu/school/faculty/stephanie-conover', 
	 'I would be happy to serve on FAC. After six years at Marist, I am interested in more opportunities to serve the broader college community beyond the Fashion Program and SCA. I enjoy collaborating with others across disciplines and think that the faculty governance committees are essential is moving Marist forward as we approach our 100th year.', 
	 '2024-04-09 17:51:15'),

    (41, 'daria.hanssen@marist.edu', 7, FALSE, 'Daria Hanssen', 'http://www.marist.edu/school/faculty/daria-hanssen', 
	 'I have been at Marist since 1996, starting as a part-time faculty in the Social Work/Sociology Department. As a tenured faculty member, I am committed to service and supporting the growth and development of students, in all ways.', 
	 '2024-04-09 17:51:15'),
	
	(42, 'kavous.ardalan@marist.edu', 4, FALSE, 'Kavous Ardalan', 'http://www.marist.edu/school/faculty/kavous-ardalan', 
	 'My experience at Marist College has been on the academic side, in the sense that I have felt most comfortable and most productive when I was a member of the rank and tenure committee. At the School of Management, I have felt most comfortable and most productive when I was a member of the peer review committee, a member of faculty search committee, or the departmental chairperson.', 
	 '2024-04-09 23:54:59'),
	
	(43, 'julie.raines@marist.edu', 7, FALSE, 'Julie Raines', 'http://www.marist.edu/school/faculty/julie-raines', 
	 'I would like to bring potential changes to the grievance process to a faculty plenary and working with current members will be the best way to develop improvements to our system. I started working on this while Chair of FAC with Beth Quinn so we have a good understanding of the areas of concern. Voting for me will give us the opportunity to make meaningful change to this process.', 
	 '2024-04-10 09:34:17'),
	
	(44, 'jennifer.robinette@marist.edu', 6, FALSE, 'Jennifer Robinette', 'http://www.marist.edu/school/faculty/jennifer-robinette', 
	 'I have been Public Speaking Across the Curriculum Coordinator on campus since 2015. I created and coordinate the Power Presenting Workshops for our First-Year Seminars. I teach COM 101-Public Presentation online during the Summer and COM 420-Advanced Public Presentation in the Fall. I am the faculty advisor for North Road Communications (NRC) - our student-run PR firm, which has grown to include 130 students and 25 Teams serving community clients. I handle the NRC one-credit experiential learning course and teach PR classes including COM 418-Campaign Management, COM 371-PR Cases, COM 333-Applied Research & Analytics, and COM 319-Crisis Communication. I also teach COM 211-Intro. to PR online during the Summer and Winter. Every semester, I teach an overload of courses out of necessity.', 
	 '2024-04-10 12:20:05'),
	
	(45, 'jason.trent@marist.edu', 7, FALSE, 'Jason Trent', 'http://www.marist.edu/school/faculty/jason-trent', 
	 'I just finished serving as the Secretary of the Faculty last semester (and I was on family leave for a portion of this current semester). I am open to serving on this committee.', 
	 '2024-04-10 12:54:22'),
	
	(46, 'thomas.madden@marist.edu', 4, FALSE, 'Thomas M. Madden', 'http://www.marist.edu/school/faculty/thomas-madden', 
	 'Not thrilled to serve on grievance as I already serve as a hearing officer in Title IX, Academic Integrity, and Student Conduct panels....but will if elected.', 
	 '2024-04-10 18:27:04'),
	
	(47, 'kuangnen.cheng@marist.edu', 4, FALSE, 'Kuangnen Cheng', 'http://www.marist.edu/school/faculty/kuangnen-cheng', 
	 'I have discovered that when a committee''s tasks and responsibilities do not align with my interests, my contribution tends to be minimal. My engagement is significantly higher in committees that develop recommendations to directly impact on student learning and life at Marist.', 
	 '2024-04-11 08:59:00'),
	
	(48, 'byunghoon.jin@marist.edu', 4, FALSE, 'Byunghoon Jin', 'http://www.marist.edu/school/faculty/byunghoon-jin', 
	 'I will be on sabbatical this fall (2024).', 
	 '2024-04-11 08:59:00'),
	
	(49, 'ryan.kinlaw@marist.edu', 7, FALSE, 'Ryan Kinlaw', 'http://www.marist.edu/school/faculty/ryan-kinlaw', 
	 'Having last year completed 6.5 years as department chair, I am currently willing to serve if elected to any committee. I feel this is an important element of the faculty role.', 
	 '2024-04-11 17:21:39'),
	
	(50, 'yuwei.wang@marist.edu', 4, FALSE, 'Yuwei Wang', 'http://www.marist.edu/school/faculty/yuwei-wang', 
	 'I will be happy to serve on any committee if elected.', 
	 '2024-04-23 13:01:23');

INSERT INTO Admins (aid, uname, thepassword, godmode) VALUES
	(1, 'admin1', 'cd6357efdd966de8c0cb2f876cc89ec74ce35f0968e11743987084bd42fb8944', TRUE)