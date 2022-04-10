import React from "react";
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Statistical.css";
// import BarChart from 'react-bar-chart';
// import { Animation } from "@devexpress/dx-react-chart";
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from "@devexpress/dx-react-chart-material-ui";

export default function Statistical() {
  // const data = [
  //   { text: 'Man', value: 500 },
  //   { text: 'Woman', value: 300 },
  //   { text: 'Other', value: 600 }
  // ];

  // const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // const color = {color: 'red'};

  // const

  const data = [
    { year: "1950", population: 2.525 },
    { year: "1960", population: 3.018 },
    { year: "1970", population: 7.232 },
    { year: "1980", population: 4.44 },
    { year: "1990", population: 8.31 },
    { year: "2000", population: 6.127 },
    { year: "2010", population: 6.93 },
    { year: "2011", population: 3.232 },
  ];

  return (
    <div className="main">
      <Header />
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right container-statistical">
            <div className="box">
              <div className="box-header">
                <label className="box-header-title">Thống kê</label>
              </div>
              <div className="box-body">
                <h3>Thống kê số lượng khách hàng</h3>
                <div class="row time-statistical">
                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <label> Thời gian bắt đầu: </label>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input type="date"></input>
                  </div>

                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <label> Thời gian kết thúc: </label>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input type="date"></input>
                  </div>
                </div>
                <div className="submit-time">
                  <div class="row">
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10"></div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <button>Xác nhận</button>
                    </div>
                  </div>
                </div>
                {/* <Chart data={data}>
                  <ArgumentAxis />
                  <ValueAxis max={7} />
                  <BarSeries valueField="population" argumentField="year" />
                  <Animation />
                </Chart> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
