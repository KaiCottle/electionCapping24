drop table if exists Committees;
drop table if exists Roles;
drop table if exists CommitteeAssignments;
drop table if exists ExportedFaculty;
drop table if exists AdminExports;
drop table if exists Exports;
drop table if exists Admins;
drop table if exists Schools;
drop table if exists Faculty;
drop table if exists People;

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

create table Exports (
	EID       serial not null,
	Ename     text not null,
	Completed bool not null,
primary key (EID)
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
	PriorServ    text null,
	LastUpdated  timestamp not null,
primary key (FID)
);

create table Committees (
	CID   serial not null,
	Cname text not null,
primary key (CID)
);

create table Roles (
	RID   serial not null,
	Rname text not null,
primary key (RID)
);

create table AdminExports (
	AID        int not null references Admins(AID),
	EID        int not null references Exports(EID),
	ExportDate timestamp not null,
primary key (AID, EID)
);

create table ExportedFaculty (
	FID int not null references Faculty(FID),
	EID int not null references Exports(EID),
primary key (FID, EID)
);

create table CommitteeAssignments (
	FID       int not null references Faculty(FID),
	CID       int not null references Committees(CID),
	StartDate date not null,
	EndDate   date null,
	RoleID    int not null references Roles(RID),
primary key (FID, CID)
);
