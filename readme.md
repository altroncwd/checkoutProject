### Basic Checkout Application
This web application is my small personal project to make a basic checkout system for devices while also learning php, and becoming more familiar with jQuery.  The project is intentinally being kept simple to focus my effors rather then building an overwhileming project that braches too much.

I would love to build this application out to a larger extent but for the basic MPV I would like to make a stable/reliable application that can :
- [x] Check in and out devices
- [x] Keeps record of when and who checked out devices
- [x] Ability to add / remove devices
- [x] Display a visible list of checkout devices
- [x] Be able to see devices details
- [x] Have as little manual typing as possible
- [x] Check in/out multiple devices at once


Goals I would like to add after I :
- [x] Remove selected devices from the checkIn/Out list
- [ ] Sorting lists (devices/logs)
- [ ] Quick swap device checkout
- [ ] Daily/weekly JSON checkout log output for more local/physical record
- [ ] Device list updating via JSON files
- [ ] Update the CSS
- [ ] Submition request verification confirmation notice/popup
- [ ] Update how the page is refreshed on completed request


Goals I would like to add after II :
- [ ] QR checkout to make checkout faster
- [ ] QR generator for new devices/users
- [ ] Slack integration
- [ ] Automatic DB cleanup

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
  - deviceType  (string) 

```
Once you have your database and tables set up you'll want to clone the repo dirrectly into the XAMPP htdocs folder.  After which you'll be able to view the "main page" of the app at
```
http://localhost/checkoutProject/checkout.html
```
To view your database via the browser to update or remove information you can 
