import React from 'react';
import {Loader, Accordion, Icon, Grid, Table} from 'semantic-ui-react';
import axios from 'axios';
import '../App.css';

const API = 'http://localhost:4000';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      loading: false,
      activeIndex: 0
    };
  }

  fetch = () => {
    let url = `${API}/transactions`
   
    this.setState({loading: true});
    axios.get(url).then(result => {
      this.setState({transactions: [...result.data]})
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  componentDidMount = () => {
    this.fetch();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const {transactions, loading, activeIndex} = this.state;

    return (
      <div>
        <Grid.Row className="custom-row">
        {loading && <Loader active inline='centered' /> }
          <Accordion fluid styled>
          { transactions && transactions.map( (trx, idx) => (
              <div key={idx}>
                <Accordion.Title active={activeIndex === idx} index={idx} onClick={this.handleClick}>
                  { trx.type === 'credit' && <Icon name='arrow circle up' color='green' />}
                  { trx.type === 'debit' && <Icon name='arrow circle down' color='red'/>}
                  Transaction Id: {trx.id}
                </Accordion.Title>

                <Accordion.Content active={activeIndex === idx}>
                  <Table definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell width={2}>Type</Table.Cell>
                        <Table.Cell>{trx.type}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Amount</Table.Cell>
                        <Table.Cell>{trx.amount}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DateTime</Table.Cell>
                        <Table.Cell>{trx.timestamp}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Accordion.Content>
             </div>
            ))}
          </Accordion>
        </Grid.Row>
      </div>
    );
  }
}

export default Home;
