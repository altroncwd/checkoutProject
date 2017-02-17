### Basic Checkout Application
This web application is my small personal project to make a basic checkout system for devices while also learning php, and becoming more familiar with jQuery.  The project is intentinally being kept simple to focus my effors rather then building an overwhileming project that braches too much.

I would love to build this application out to a larger extent but for the basic MPV I would like to make a stable/reliable application that can :
- Check in and out devices
- Keeps record of when and who checked out devices
- Ability to add / remove devices
- Display a visible list of checkout devices
- Be able to see view devices by details


Goals I would like to add after I :
- Quick swap device checkout
- Toaster popup for buttons
- Daily/weekly JSON checkout log output for more local/physical record
- Device list updating via JSON files

Goals I would like to add after II :
- QR checkout to make checkout faster
- QR generator for new devices/users

### Basic Use
In order to use this template you'll need to be running a local php server.  Currently I am using XAMPP for its easy install and use.  You will need to create a database called
```
  checkoutSystem
```

in addition you will need to create two of the following tables:

```
  checkoutLog
  - id        (primary + auto increment)
  - deviceName(string)
  - user      (string)
  - inOrOut   (string)
  - date      (timestamp)
```

```
  deviceList
  - id          (primary + auto increment)
  - deviceName  (string + unique)
  - phoneModel  (string)
  - osVersion   (string)
  - status      (string)

```
Once you have your database and tables set up you'll want to clone the repo dirrectly into the XAMPP htdocs folder.  After which you'll be able to view the "main page" of the app at
```
http://localhost/checkoutProject/checkout.html
```
