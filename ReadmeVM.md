# Election Capping 24

**An online voting platform for Marist faculty to decide on department chair positions.**  
This project enables faculty to nominate themselves, explain their candidacy, and participate in voting using their Marist SSO credentials.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [VM Environment Details](#vm-environment-details)
5. [Setup Instructions](#setup-instructions)
6. [Support](#support)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Introduction

This platform is designed for Marist College faculty to facilitate online voting for departmental chair positions. Faculty members can nominate themselves, provide statements explaining why they are the best fit, and participate in secure voting managed by the admins of the site.

---

## Features

- **Admin Access**: Dedicated admin accounts to manage the platform.
- **Faculty Voting**: Secure voting system for faculty to vote for candidates.
- **Marist SSO Integration**: Faculty can log in using their Marist email credentials for streamlined access.
- **Database Integration**: Stores faculty nominations, including personal details and up to 300-word statements for candidacy.

---

## Requirements

To run this platform, your environment must meet the following prerequisites:

- A 64-bit processor.
- At least 4GB of RAM.
- A minimum of 25GB of hard disk space.
- CPU support for hardware virtualization features (e.g., Intel VT-x or AMD-v).

---

## VM Environment Details

- **IP Address**: `10.11.29.95`
- **Operating System**: Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-48-generic x86_64)
- **Login Credentials**:
  - **Username**: `root@10.11.29.95`
  - **Password**: `MaristDev2024!`
- **SSH Command**:
  ```bash
  ssh root@10.11.29.103
  ```

---

## Updates

- **Run the following to view updates**: apt list --upgradable
- Consider enabling ESM Apps for extended security maintenance: Ubuntu ESM Documentation.

## Setup Instructions

- **CLone repo**: git clone https://github.com/KaiCottle/electionCapping24.git

- **Install Dependencies**: Install any required software dependencies using your package manager like npm install or pip install
- **Configuration**: Set up necessary environment variables or configuration files for example the Marist SSO credentials.
- **Starting the application**: Use command npm start to start the application

## Support

- **If you encounter issues with the VM or SSO contact Marist IT and Services for help**: Email: HelpDesk@marist.edu, Phone: (845) 575-4357
- For porject related issues, clone the repo using: git clone https://github.com/KaiCottle/electionCapping24.git

## Contributing

- **Contributions are always appreciated! Just follow these steps**:

1. Fork the Repo
2. Create a new branch for our feature or bug fix
3. Submit a pull request

## License

**Project is licensed under Marist College**

## Contact

- **For more information or if you have any additional questions, reach out to**:

- Joseph Fischetti: joseph.fischetti@marist.edu
- Chris Algozzine: Chris.Algozzine@marist.edu
- Marist IT: HelpDesk@marist.edu | (845) 575-4357
