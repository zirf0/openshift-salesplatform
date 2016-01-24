# OpenShift-SalesPlatform

[![Join the chat at https://gitter.im/zirf0/openshift-salesplatform](https://badges.gitter.im/zirf0/openshift-salesplatform.svg)](https://gitter.im/zirf0/openshift-salesplatform?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

SalesPlatform is a fork of VtigerCRM adapted for Russian Federation. Version 6.4.0
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

7) Customer portal is avaliable at http://sp-$yourdomain.rhcloud.com/sd

# TODO

1. Take a rest.
2. Add OpenShift-specific documentation
