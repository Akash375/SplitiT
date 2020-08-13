import React,{ Component, useState } from 'react';
import { Jumbotron, Card, CardTitle, CardText, CardSubtitle, CardHeader, CardBody, Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Calculate from './CalculateComponent';

let names=[];

const NewCard=(props)=>{

    const [inputList, setInputList] = useState([{ what: "", money: "" }]);
    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };

      const handleAddClick = () => {
        setInputList([...inputList, { what: "", money: "" }]);
      };

      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };

      const Submit=(values)=>{
          names.push(values.name);
          var amt=0;
          {names.map((i)=>{
            alert("Name="+names);
          })}
          {inputList.map((x,i)=>{
            amt=amt+parseInt(x.money);
          })}
          alert("Amount="+JSON.stringify(amt/props.count));
        //console.log("Current State is: "+JSON.stringify(values));
        //alert("Current State is: "+JSON.stringify(values));
        alert("Current State is: "+JSON.stringify(inputList));
        return(
            <div>
            akash
            </div>
        );
        //alert("name="+JSON.stringify(values.name));
        //<Calculate inputList={inputList} name={values.name} />
      };

    return(
            <>
            <Card className="mt-1 NewCard">
                        <CardBody>
                        <LocalForm onSubmit={(values) =>Submit(values)}>
                                    <Row className="form-group">
                                    <Label htmlFor="name"><i className="fa fa-users fa-lg"></i></Label>
                                        <Col xs={8}>
                                        <Control.text model=".name" id="name" placeholder="Name" className="form-control"></Control.text>
                                        </Col>
                                    </Row>
                        {inputList.map((x, i) => {
                                return (
                                    <>
                                    <Row className="form-group">
                                        <Col xs={6}>
                                            <Control.text model=".what" id="what" name="what" placeholder="What?" className="form-control" value={x.what} onChange={e => handleInputChange(e, i)}/>
                                                </Col>
                                                <Col xs={6}>
                                                    <Control.input model=".money" id="money" name="money" placeholder="How Much?" className="form-control" value={x.money} onChange={e => handleInputChange(e, i)}/>
                                                </Col>
                                    </Row>
                                    {inputList.length - 1 === i &&  
                                    <Row className="form-group">
                                        <Col >
                                            <Button className="dash-button" onClick={handleAddClick}>
                                            <i className="fa fa-plus-square fa-lg"></i> More
                                            </Button>
                                        </Col>
                                        <Col>
                                                {inputList.length !== 1 &&
                                                    <Button className="dash-button" onClick={()=>handleRemoveClick(i)}>
                                                    <i className="fa fa-minus-circle fa-lg"></i>
                                                    </Button>
                                                }
                                                </Col>
                                    </Row>  }
                                    </>
                                );
                            })}
                            <Button type="submit" color="success" className="dash-button">
                                Calculate!
                </Button>
                            </LocalForm>
                        </CardBody>
                    </Card>
            </>
    );
}

const required= (val)=>val&&val.length;

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state={
            count: 3,
            isNew: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.increment=this.increment.bind(this);
        this.RenderNew=this.RenderNew.bind(this);
    }

    handleSubmit(values){
        console.log("Current State is: "+JSON.stringify(values));
        //alert("Current State is: "+JSON.stringify(values));
        if(!this.state.isNew){
            this.setState({
                isNew: !this.state.isNew
            });
        }
        
    }

    increment(){
        if(this.state.count<=9){
            this.setState({
                count: this.state.count+1
            });
        }
    }

    decrement(){
        if(this.state.count>2){
            this.setState({
                count: this.state.count-1
            });
        }
    }

    RenderNew(){
        if(this.state.isNew){
            let rows=[];
            for(let i=1;i<=this.state.count;i++)
            rows.push(<NewCard count={this.state.count} key={i}/>)
                return(
                    <div className="col-12">
                {rows}
                
                </div>
            );   
        }
    }

    render(){
        return(
            <>
            <Jumbotron className="dash">
            <div className="container">
                <div className="row ">
                    <div className="col-2 col-md-1">
                    <i className="fa fa-user fa-5x"></i>
                    </div>
                    <div className="col-auto">
                    Name: user<br/>
                    Username: user
                    </div>
                </div>
            </div>
            </Jumbotron>
            <div className="container">
                <div className="row">
                    <div className="col-md-5 d-flex justify-content-center">
                    <Card>
                        <CardHeader className="new"><center><h5><i className="fa fa-plus-square fa-lg"></i> Start New Calculation</h5></center></CardHeader>
                        <CardBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group d-flex justify-content-center">
                            
                                <Label htmlFor="count">How many people are in your group?</Label>
                               </Row>
                                <Row className="form-group d-flex justify-content-center">
                                    <Col>
                                    <i className="fa fa-minus-square fa-2x" onClick={()=>this.decrement()}></i>
                                    </Col>
                                    <Col xs={8}>
                                    <Control.input model=".count" id="count" name="count"
                                        value={this.state.count}
                                        defaultValue={this.state.count}
                                        className="form-control"
                                        style={{textAlign:"center"}}
                                         />
                                         </Col>
                                         <Col>
                                         <i className="fa fa-plus-square fa-2x" onClick={()=>this.increment()}></i>
                                         </Col>
                                         
                            </Row>
                            <Row className="form-group d-flex justify-content-center">
                               <Label htmlFor="title">Give it a Name!</Label>
                               </Row>
                                <Row className="form-group d-flex justify-content-center">
                                    <Col md={8}>
                                <Control.text model=".title" id="title" name="title" placeholder="Roadtrip?" style={{textAlign:"center"}} 
                                 className="form-control"
                                 validators={{
                                    required
                                }} />
                                <Errors className="text-danger" model=".title" show="touched"
                                         messages={{
                                             required: 'Required'    
                                         }}
                                         />
                                </Col>
                                </Row>
                                <Row className="form-group">
                                <Col >
                                    <Button type="submit" color="success" className="dash-button">
                                    Go!!
                                    </Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>
                            
                        </CardBody>
                    </Card>
                    </div>
                    <div className="col-md-5 ml-md-1 d-flex justify-content-center">
                        {this.RenderNew()}
                        
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Dashboard;