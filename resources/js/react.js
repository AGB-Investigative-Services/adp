import React, { Component } from "react";

class InputTagCollection extends Component {
    render() {
        console.log(this.props.tags);
        const { search, yearly, hireReason, positionStatus, region, terminationType } = this.props.tags;
        return (
            <div id="chosen-tags">
                {search.inputTerm.length ? (
                    <div className="collection" onClick={this.props.cancelSearchTag}>
                        <h6 onClick={this.props.cancelSearchTag}>{search.inputTerm}</h6>
                    </div>
                ) : null}
                {/* ************** YEARLY ************** */}
                {yearly["2020"] ? (
                    <div
                        className="collection 2020"
                        data-name="2020"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2020">2020</h6>
                    </div>
                ) : null}
                {yearly["2019"] ? (
                    <div
                        className="collection 2019"
                        data-name="2019"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2019">2019</h6>
                    </div>
                ) : null}
                {yearly["2018"] ? (
                    <div
                        className="collection 2018"
                        data-name="2018"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2018">2018</h6>
                    </div>
                ) : null}
                {yearly["2017"] ? (
                    <div
                        className="collection 2017"
                        data-name="2017"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2017">2017</h6>
                    </div>
                ) : null}
                {yearly["2016"] ? (
                    <div
                        className="collection 2016"
                        data-name="2016"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2016">2016</h6>
                    </div>
                ) : null}
                {yearly["2015"] ? (
                    <div
                        className="collection 2015"
                        data-name="2015"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2015">2015</h6>
                    </div>
                ) : null}
                {yearly["2014"] ? (
                    <div
                        className="collection 2014"
                        data-name="2014"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2014">2014</h6>
                    </div>
                ) : null}
                {yearly["2013"] ? (
                    <div
                        className="collection 2013"
                        data-name="2013"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2013">2013</h6>
                    </div>
                ) : null}
                {yearly["2012"] ? (
                    <div
                        className="collection 2012"
                        data-name="2012"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2012">2012</h6>
                    </div>
                ) : null}
                {yearly["2011"] ? (
                    <div
                        className="collection 2011"
                        data-name="2011"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2011">2011</h6>
                    </div>
                ) : null}
                {yearly["2010"] ? (
                    <div
                        className="collection 2010"
                        data-name="2010"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2010">2010</h6>
                    </div>
                ) : null}
                {yearly["2010"] ? (
                    <div
                        className="collection 2010"
                        data-name="2010"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2010">2010</h6>
                    </div>
                ) : null}
                {yearly["2009"] ? (
                    <div
                        className="collection 2009"
                        data-name="2009"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2009">2009</h6>
                    </div>
                ) : null}
                {yearly["2008"] ? (
                    <div
                        className="collection 2008"
                        data-name="2008"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2008">2008</h6>
                    </div>
                ) : null}
                {yearly["2007"] ? (
                    <div
                        className="collection 2007"
                        data-name="2007"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2007">2007</h6>
                    </div>
                ) : null}
                {yearly["2006"] ? (
                    <div
                        className="collection 2006"
                        data-name="2006"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="2006">2006</h6>
                    </div>
                ) : null}
                {yearly["1999"] ? (
                    <div
                        className="collection 1999"
                        data-name="1999"
                        onClick={e => this.props.allFilterClickListener(e, "yearly")}
                    >
                        <h6 data-name="1999">1999</h6>
                    </div>
                ) : null}
                {/* ************** hireReason ************** */}
                {hireReason["New Position"] ? (
                    <div
                        className="collection"
                        data-name="New Position"
                        onClick={e => this.props.allFilterClickListener(e, "hireReason")}
                    >
                        <h6 data-name="New Position">New Position</h6>
                    </div>
                ) : null}
                {hireReason["Existing Position"] ? (
                    <div
                        className="collection"
                        data-name="Existing Position"
                        onClick={e => this.props.allFilterClickListener(e, "hireReason")}
                    >
                        <h6 data-name="Existing Position">Existing Position</h6>
                    </div>
                ) : null}
                {/* ************** positionStatus ************** */}
                {positionStatus.Active ? (
                    <div
                        className="collection"
                        data-name="Active"
                        onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
                    >
                        <h6 data-name="Active">Active</h6>
                    </div>
                ) : null}
                {positionStatus.Terminated ? (
                    <div
                        className="collection"
                        data-name="Terminated"
                        onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
                    >
                        <h6 data-name="Terminated">Terminated</h6>
                    </div>
                ) : null}
                {positionStatus.Leave ? (
                    <div
                        className="collection"
                        data-name="Leave"
                        onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
                    >
                        <h6 data-name="Leave">Leave</h6>
                    </div>
                ) : null}
                {positionStatus.Deceased ? (
                    <div
                        className="collection"
                        data-name="Deceased"
                        onClick={e => this.props.allFilterClickListener(e, "positionStatus")}
                    >
                        <h6 data-name="Deceased">Deceased</h6>
                    </div>
                ) : null}
                {/* ************** region ************** */}
                {region["Darryl\'s Region"] ? (
                    <div
                        className="collection"
                        data-name="Darryl\'s Region"
                        onClick={e => this.props.allFilterClickListener(e, "region")}
                    >
                        <h6 data-name="Darryl\'s Region">Darryl's Region</h6>
                    </div>
                ) : null}
                {region.Administration ? (
                    <div
                        className="collection"
                        data-name="Administration"
                        onClick={e => this.props.allFilterClickListener(e, "region")}
                    >
                        <h6 data-name="Administration">Administration</h6>
                    </div>
                ) : null}
                {region["Steve\'s Region"] ? (
                    <div
                        className="collection"
                        data-name="Steve\'s Region"
                        onClick={e => this.props.allFilterClickListener(e, "region")}
                    >
                        <h6 data-name="Steve\'s Region">Steve's Region</h6>
                    </div>
                ) : null}
                {region["Odom\'s Region"] ? (
                    <div
                        className="collection"
                        data-name="Odom\'s Region"
                        onClick={e => this.props.allFilterClickListener(e, "region")}
                    >
                        <h6 data-name="Odom\'s Region">Odom's Region</h6>
                    </div>
                ) : null}
                {region["Alicia\'s Region"] ? (
                    <div
                        className="collection"
                        data-name="Alicia\'s Region"
                        onClick={e => this.props.allFilterClickListener(e, "region")}
                    >
                        <h6 data-name="Alicia\'s Region">Alicia's Region</h6>
                    </div>
                ) : null}
                {region["AGB Foundation"] ? (
                    <div
                        className="collection"
                        data-name="AGB Foundation"
                        onClick={e => this.props.allFilterClickListener(e, "region")}
                    >
                        <h6 data-name="AGB Foundation">AGB Foundation</h6>
                    </div>
                ) : null}
                {/* ************** terminationType ************** */}
                {terminationType.Involuntary ? (
                    <div
                        className="collection"
                        data-name="Involuntary"
                        onClick={e => this.props.allFilterClickListener(e, "terminationType")}
                    >
                        <h6 data-name="Involuntary">Involuntary</h6>
                    </div>
                ) : null}
                {terminationType.Voluntary ? (
                    <div
                        className="collection"
                        data-name="Voluntary"
                        onClick={e => this.props.allFilterClickListener(e, "terminationType")}
                    >
                        <h6 data-name="Voluntary">Voluntary</h6>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default InputTagCollection;