<template>
  <!-- Stage- Bootstrap one page Event ticket booking theme 
  Created by pixpalette.com - online design magazine-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-5 left-wrapper">
        <div class="event-banner-wrapper">
          <div class="logo" hidden>
            <h1>
              <a href="http://omf/">https://OMF/</a>
            </h1>
          </div>
          <div class="omf-title">
            <h2>
              OMF
              <br />
              <span>Your One-Stop Orchestration Framework</span>
            </h2>
            <p>
              created by
              <a href="about">Michael Bayha</a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-7 right-wrapper">
        <div class="event-ticket-wrapper">
          <div class="event-tab">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li v-for="(item, index) in indextabs" :key="index" class="active">
                <a v-bind:href="item.link" role="tab">{{ item.title }}</a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div class="card-rows" v-for="card in cards" :key="card.id">
                <homecard
                  :id="card.id"
                  :title="card.title"
                  :date="card.date"
                  :content="card.content"
                  :link="card.link"
                ></homecard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homecard from "../views/components/HomeCard";
import hometab from "../views/components/HomeTab";
// import Vue from "vue";

export default {
  name: "homepage",
  components: {
    homecard,
    hometab
  },
  data() {
    return {
      indextabs: [
        // TODO: make content field markdown
        {
          id: 0,
          title: "Home",
          description: [
            "New to OMF,",
            "Click here to start your onboarding journey"
          ],
          link: ""
        },
        {
          id: 1,
          title: "Documentation",
          description: [
            "Looking for tutorials or configurations?",
            "Click here to our documentation base"
          ],
          link: ""
        },
        {
          id: 2,
          title: "Workflows",
          description: ["Access your team owned workflows and orchestrations"],
          link: ""
        },
        {
          id: 3,
          title: "Onboard",
          description: [
            "OMF Admin?",
            "Click here to admin views and administrations tools"
          ],
          link: "/#/onboard"
        },
        {
          id: 4,
          title: "Contact",
          description: ["Questions or feedbacks"],
          link: ""
        }
      ],
      cards: [
        {
          id: 0,
          title: "Orchestration Management Framework",
          date: "2018-12-01",
          content: [
            "The OMF is a cloud based framework that automatically aids in the remediation of service outages for partners of eCP, builing using StackStorm, Django, and native AWS technologies. It integrates the Event Management Framework (EMF), ServiceNow, PagerDuty and existing DevOps platforms.",
            'New to OMF? Click {{ <a href="http://omf">here</a> }} to onboard to OMF...Read More'
          ],
          link: "#"
        },
        {
          id: 1,
          title: "Blog: OMF V2 is Ready in PCI And CORP Environment!",
          date: "2018-12-01",
          content: [
            "We are happy to announce that OMF v2 is having a soft launch in PCI and CORP environment",
            "bla,bla,bla"
          ],
          link: "http://omf/"
        },
        {
          id: 2,
          title:
            "Announance: OMF will be at maintainance from 8pm - 10pm PST on 1/1/2019",
          date: "2018-12-01",
          description: ["Access your team owned workflows and orchestrations"],
          link: "http://omf/"
        }
      ]
    };
  }
};
</script>

<style>
/* Stage- Bootstrap one page Event ticket booking theme 
Created by pixpalette.com - online design magazine */

/* CSS Document */

html,
body {
  font-family: "Muli", sans-serif;
  font-size: 14px;
  font-weight: 400;
}

/* common style's */
a {
  color: #000;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

a:hover,
a:focus,
a:active {
  text-decoration: none;
  outline: none;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 24px;
  /* font-family: Courier; */
}

/* button style */
.btn,
.btn.disabled {
  background: #00bfff;
  color: #ffffff;
  border: 0;
  border-radius: 5px;
}

.btn.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  opacity: 0.5;
}

/* form style */
label {
  font-weight: 400;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  height: 40px;
  font-size: 18px;
  border: 0;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
  padding: 6px 0px;
  box-shadow: none;
  font-weight: 100;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

.form-control:focus {
  border-color: #666666;
  outline: 0;
  box-shadow: none;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

/* loader */
.loader {
  position: fixed;
  color: white;
  background: #ffffff;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.loader > div {
  text-align: center;
  margin: 0px auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.left-wrapper,
.right-wrapper {
  padding-right: 0px;
  padding-left: 0px;
}

/* event banner css */
.event-banner-wrapper {
  position: fixed;
  width: 41.66666667%;
  height: 100%;
  padding: 20px;
  background-color: #00bfff;
  background-position: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.logo {
  background-color: #000;
}

.logo h1 a {
  /* font-family: "Courier New", Courier, monospace; */
  position: absolute;
  color: #ffffff;
  font-size: 28px;
  font-weight: 300;
  margin: 0;
  top: 20px;
  left: 20px;
}

.event-banner-wrapper h2 {
  position: absolute;
  /* font-family: "Courier New", Courier, monospace; */
  font-size: 4vw;
  font-weight: 900;
  line-height: 4.5vw;
  color: rgb(250, 245, 245);
  margin: 0;
  /* bottom: 30px; */
  top: 350px;
}

.event-banner-wrapper h2 span {
  display: block;
  text-transform: uppercase;
  font-size: 1.5vw;
}

.event-banner-wrapper p {
  position: absolute;
  /* font-family: "Courier New", Courier, monospace; */
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  margin: 0;
  bottom: 15px;
}

.event-banner-wrapper p a {
  color: #fff;
}

.event-banner-wrapper p a:hover {
  border-bottom: 1px solid #fff;
}

/* event ticket css */
.event-ticket-wrapper {
  padding: 40px;
}

.event-tab .nav-tabs {
  position: fixed;
  top: 0;
  left: 41.66666667%;
  background: #fff;
  width: 58.33333333%;
  border-bottom: 0;
  padding: 20px 40px;
  margin-bottom: 30px;
  z-index: 99;
}

.event-tab .nav-tabs > li > a {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.28);
  margin-right: 30px;
  padding: 5px 0px;
  text-transform: uppercase;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.event-tab .nav-tabs > li.active > a,
.event-tab .nav-tabs > li.active > a:hover,
.event-tab .nav-tabs > li.active > a:focus,
.event-tab .nav-tabs > li > a:hover,
.event-tab .nav-tabs > li > a:focus {
  background: transparent;
  color: #000000;
  border: 1px solid transparent;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.event-tab .tab-content {
  color: #000;
  margin-top: 45px;
}

.event-tab .tab-content .tab-pane {
  margin-bottom: 30px;
}

.ticketBox {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.ticketBox:hover {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.inActiveTicket .inactiveStatus {
  /* background: rgba(248, 248, 248, 0.68); */
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 11;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.ticketBox .ticket-name span {
  color: #000;
  display: block;
  font-size: 30px;
  font-weight: 400;
}

.ticketBox .ticket-price-count-box .price {
  margin: 0;
  color: #000000;
  font-weight: 600;
  float: right;
  width: 100%;
  text-align: right;
}

.ticketBox .ticket-price-count-box .ticket-control {
  float: right;
  width: 120px;
}

.ticketBox .ticket-price-count-box .ticket-control .form-control {
  width: 50px;
  font-weight: 600;
  text-align: center;
  border: 0;
  box-shadow: none;
  display: inline-block;
  pointer-events: none;
  font-size: 20px;
  margin: 0px 4px;
  background: transparent;
}

.ticketBox
  .ticket-price-count-box
  .ticket-control
  .input-group
  .input-group-btn
  button {
  display: inline-block;
  border: 0px solid rgba(0, 0, 0, 0.12);
  padding: 10px;
  width: 32px;
  text-align: center;
  border-radius: 50%;
  font-weight: 600;
  color: #000000;
  font-size: 9px;
  background: rgba(0, 0, 0, 0.09);
  box-shadow: none;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.ticketBox
  .ticket-price-count-box
  .ticket-control
  .input-group
  .input-group-btn
  button:hover,
.ticketBox
  .ticket-price-count-box
  .ticket-control
  .input-group
  .input-group-btn
  button:focus {
  outline: none;
  background: rgba(0, 0, 0, 0.15);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.ticketBox .ticket-description {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  padding-top: 15px;
}

.ticketBox .ticket-description p {
  font-size: 14px;
  font-weight: 400;
  color: #666;
}

.ticketBox .ticket-description p strong {
  font-weight: 600;
  color: #000;
  font-size: 16px;
}

/* map iframe */
iframe {
  width: 100%;
  border: 0;
}

/* cart style */
.cart {
  padding: 20px 40px;
  background: #fff;
  margin-bottom: 0;
  position: fixed;
  left: 41.66666667%;
  bottom: 0;
  width: 58.33333333%;
  z-index: 99;
}

.cart p {
  color: #000;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 400;
  margin-top: 8px;
}

.cart p .divider {
  border-right: 2px solid #ccc;
  padding-left: 15px;
  margin-right: 15px;
}

/* cart ticket details */
.cart-information {
  margin-bottom: 30px;
  color: #000;
}

.cart-information .ticket-type {
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.cart-information .ticket-type span {
  font-size: 14px;
  line-height: 18px;
  display: block;
  font-weight: 400;
  color: #666;
}

.cart-information ul {
  margin: 0;
  padding: 0;
}

.cart-information ul li {
  list-style-type: none;
  font-size: 18px;
  margin-bottom: 4px;
}

.cart-information ul li span {
  float: right;
}

.cart-information ul li span.totalAmount {
  font-weight: 600;
}

.cart-information hr {
  margin-top: 5px;
  margin-bottom: 5px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
}

/* contact form style */
.contactForm h3 {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 600;
}

.contactForm .btn {
  width: 100%;
}

/* side modal style */
.modal-content {
  border-radius: 0;
}

.modal-body {
  padding: 0;
}

.modal-header {
  padding: 20px 30px;
  border-bottom: 1px solid #e5e5e5;
}

.modal-title {
  text-transform: uppercase;
}

.modal .close {
  opacity: 0.4;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}

.modal .close:hover {
  opacity: 0.4;
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}

.modal.right .modal-dialog {
  position: fixed;
  margin: auto;
  width: 350px;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

.modal.right .modal-content {
  height: 100%;
  overflow-y: auto;
  border: 0;
}

.modal.right .modal-body {
  padding: 30px;
}

.modal.right.fade .modal-dialog {
  right: -320px;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
  -o-transition: opacity 0.3s linear, right 0.3s ease-out;
  transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
  right: 0;
}

/* media query for tab */
@media (max-width: 767px) {
  .event-banner-wrapper {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 15px;
  }

  .event-banner-wrapper h2 {
    font-size: 38px;
    line-height: 38px;
  }

  .event-banner-wrapper h2 span {
    font-size: 16px;
  }

  .event-ticket-wrapper {
    padding: 20px;
  }

  .event-tab .nav-tabs {
    margin-bottom: 10px;
    position: relative;
    top: 0;
    left: 0;
    padding: 0;
    width: 100%;
  }

  .cart {
    padding: 15px;
    background: #fff;
    margin-bottom: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
}

/* media query for Mobile */
@media (max-width: 480px) {
  .modal.left .modal-dialog,
  .modal.right .modal-dialog {
    width: 100%;
  }

  .event-tab .nav-tabs > li > a {
    font-size: 16px;
    margin-right: 0;
    padding: 2px 0px;
  }

  .event-tab .nav-tabs > li {
    width: 100%;
  }

  .cart p {
    font-size: 16px;
    margin: 0;
  }

  .cart p .divider {
    border-right: 0px;
    padding-left: 0;
    margin-right: 0;
    display: block;
  }
}
</style>
