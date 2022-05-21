import React, { useEffect, useState } from "react";
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Statistical.css";
// import { Animation } from "@devexpress/dx-react-chart";
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from "@devexpress/dx-react-chart-material-ui";

import axios from "axios";
import { API_URL, TOKEN } from "../../actions/types";
import setAuthToken from "../../utils/setAuthToken";

export default function Statistical() {
  // const data = [
  //   { text: 'Man', value: 500 },
  //   { text: 'Woman', value: 300 },
  //   { text: 'Other', value: 600 }
  // ];

  // const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // const color = {color: 'red'};

  // const

  // const data = [
  //   { year: "19501111", population: 2.525 },
  //   { year: "19601111", population: 3.018 },
  //   { year: "19701111", population: 7.232 },
  //   { year: "198011", population: 4.44 },
  //   { year: "199011", population: 8.31 },
  //   { year: "20001", population: 6.127 },
  //   { year: "20101", population: 6.93 },
  //   { year: "201111", population: 3.232 },
  // ];
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
  );
  const [endDate, setEndDate] = useState(new Date());
  useEffect(async () => {
    try {
      setAuthToken(localStorage.getItem(TOKEN));
      const response = await axios.post(`${API_URL}/api/Statistical/all`, {
        startDate,
        endDate,
      });
      console.log(response);
      if (response.data.success) {
        setData(response.data.appointments);
      }
    } catch (error) {
      console.log("call error API ");
    }
  }, []);

  const onSubmit = async () => {
    try {
      setAuthToken(localStorage.getItem(TOKEN));
      const response = await axios.post(`${API_URL}/api/Statistical/all`, {
        startDate,
        endDate,
      });
      if (response.data.success) {
        setData(response.data.appointments);
      }
    } catch (error) {
      console.log("call error API ");
    }
  };

  const onChange = (event) => {
    if (event.target.name == "startDate")
      setStartDate(new Date(event.target.value));
    else if (event.target.name == "endDate")
      setEndDate(new Date(event.target.value));
  };

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
                    <input
                      type="date"
                      name="startDate"
                      value={startDate.toISOString().split("T")[0]}
                      onChange={onChange}
                    ></input>
                  </div>

                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>

                  <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <label> Thời gian kết thúc: </label>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <input
                      type="date"
                      name="endDate"
                      value={endDate.toISOString().split("T")[0]}
                      onChange={onChange}
                    ></input>
                  </div>
                </div>
                <div className="submit-time">
                  <div class="row">
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10"></div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                      <button onClick={onSubmit}>Xác nhận</button>
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
      <Footer />
    </div>
  );
}
