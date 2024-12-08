drop table if exists CommitteeAssignments cascade;
drop table if exists Committees cascade;
drop table if exists Faculty cascade;
drop table if exists Admins cascade;
drop table if exists Schools cascade;
drop table if exists People cascade;

-- Creating tables

create table People (
	PID   serial not null,
	Fname text not null,
	Lname text not null,
primary key (PID)
);

create table Admins (
	AID         int not null references People(PID),
	Uname       text not null,
	ThePassword text not null,
	Godmode     bool not null,
primary key (AID)
);

create table Schools (
	SID   serial not null,
	Sname text not null,
primary key (SID)
);

create table Faculty (
	FID          int not null references People(PID),
	Email        text not null,
	SchoolID     int not null references Schools(SID),
	IsHidden     bool not null,
	PrefName     text null,
	URL          text not null,
	TheStatement text not null,
	LastUpdated  timestamp not null,
primary key (FID)
);

-- Add the new column 'token' to the Faculty table (NOT GOING TO BE USED ANYMORE)
--alter table Faculty
--add token text;

create table Committees (
	CID   serial not null,
	Cname text not null,
primary key (CID)
);

create table CommitteeAssignments (
	FID       int not null references Faculty(FID),
	CID       int not null references Committees(CID),
primary key (FID, CID)
);
