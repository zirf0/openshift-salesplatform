# OpenShift-SalesPlatform

SalesPlatform is a fork of VtigerCRM adapted for Russian Federation. 

# Setup


1) Create an account at https://www.openshift.com

2) Create a php application with mysql:

    $ rhc app create sp php-5.3 mysql-5.5 

3) Add this upstream mediawiki repo

    $ cd sp
    $ git remote add upstream -m master git://github.com/zirf0/openshift-salesplatform.git
    $ git pull -s recursive -X theirs upstream master

4) Then push the repo upstream

    $ git push

5) That's it, you can now checkout your application at:

    http://sp-$yourdomain.rhcloud.com

6) Follow installatin procedure

# TODO

1. Replace input of MySQL settings with OpenShift enviromental variables. 
2. Add Customer portal.
3. Add Kladr.
