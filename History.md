# 2.1.2 / 2025-03-20

*Added Unit Test for Backend (Server Healthcare)
*Added git and keywords to app package.json
*Fixed Version counting across app

# 2.1.1 / 2025-03-21

*Updated readme file - (added upcomming feature section)
*Fixed modarate bug - (removed useState for checking admin) 

# 2.1.0 / 2025-03-20

*Added leave group dialog modal - (to confirm)

# 2.0.2 / 2025-03-19

*Added Leave Group feature - (with restfull api)
*Updated mongoDB group schema - (removed groupMessage ID field)
*Updated Profile or group info option menu - (re-structured and group only option added)
*Updated Search bar for searching group name too - (in chat container sidebar)

# 2.0.1 / 2025-03-18

*Updated sidebar search bar 
*Fixed sidebar cltr + k not visible in dark mode

# 2.0.0 / 2025-03-17

*Added cron to increase app uptime - (an request go for app after avery 14 min)
*Added Delete Group Feature - (deleting group will also delete all the chats)
*Added Clear Chat feature in Group Chat - (using an Rest-full API)
*Updated chatEZ version to 2.0.0 - (both frontend & backend with api versioning and packege.json)
*Updated chunk size Increase limit to 1000 KB - (for onrender)
*Fixed minor bug - (made nameing better in backend and put handle-feature in search bar)

# 1.2.10 / 2025-03-16

*Updated Readme file - (added features and made clear)
*Fixed deployment bug - (critical bug - added text type in GroupMesaage interface)

# 1.2.9 / 2025-03-15

*Added delete message in group chat - (made an api to communicate)
*Added toast for validation - (using response and HotToast)

# 1.2.8 / 2025-03-14

*Added chat feature in group - (without option)
*Added send message api for group chat - (with encryption)
*Added group added to chat container - (with api supported by DB)
*Added member name in sidebar of group - (below the group name)
*Updated code base - (removed other console log's)
*Updated future tasks and action - (todo has been updated for development) 
*Fixed major bug - (made group format correct)
*Fixed major bug - (wrog file has been fixed)
*Fixed minor bugs - (made code cleaner and better to read)

# 1.2.7 / 2025-03-13

*Added Create Group API - (backend to DB)
*Added (DB modal added groupPic and image to groupMessage)
*Added Create Group route - (in useGroupStore)
*Fixed minor bugs - (better name convertions)

# 1.2.6 / 2025-03-12

*Improved sidebar option modal (UI)
*Removed join group button - (as admin of group have riots to add an user)
*Fixed minor bug - (api route name from getAlluser to users in /controller folder)

# 1.2.5 / 2025-03-11

*Added Create Group Model
*Updated Chat-app Sidebar - (added user name and create and join group option)
*Fixed minor bugs in CLient for stability (Cosmetic Bug - shortcut command UI(icon) improved)

# 1.2.4 / 2025-03-10

*Updated security - (disabled critical event like deleting account from admin in demo mode)
*Fixed minor bugs in CLient for stability (Cosmetic Bug - Admin dashboard sidebar and placeholder in Admin login)

# 1.2.3 / 2025-03-09

*Added clear chat feature
*Fixed minor bugs in CLient and Server for stability

# 1.2.2 / 2025-03-08

*Added Search bar in chat container
*Added MOre option in chat container
*Fixed minor bugs in CLient and Server for stability

# 1.2.1 / 2025-03-07

*Added version in api- (currently at v1)
*Added delete user from admin panel feature
*Added delete message for user
*Added Copy message feature
*Updated user is active or not feature in admin dashboard
*Fixed minor bugs for improved stability

# 1.2.0 / 2025-03-05

*Added join room feature
*Updated admin dashboard has been modefied
*Fixed creating room functnality
*Fixed Admin login bug 
*Fixed minor bugs for improved stability

# 1.1.0 / 2025-02-08

*Added admin route security with custom admin authentication middleware  
*Added notification feature for new messages  
*Added API rate limiting for `send_otp` endpoint  
*Added delete user functionality in the admin dashboard  
*Added versioning for the app
*Fixed minor bugs for improved stability

# 1.0.0 / 2025-02-05

- Initial release
