import React from 'react'
import './App.css'
import Chat from './Chat'
import Video from './Video'

import { fetchMessages, sendMessage, receiveMessage, receiveStart} from './network'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], streamOn: false};
  }
  componentDidMount() {
    fetchMessages().then(messages=> {
      this.setState({
        messages
      });
      receiveMessage(this.onReceiveMessage.bind(this))
      receiveStart(this.onReceiveStart.bind(this))
    });
  }
  onReceiveStart() {
    this.setState({ streamOn: true})
  }
  onReceiveMessage(message) {
    this.setState({ messages: [...this.state.messages, message] })
  }
  onSendMessage(message) {
    sendMessage(message)
  }
  render() {
    return (
      <div className="App">
        <Video streamOn={this.state.streamOn}/>
        <Chat onSendMessage={this.onSendMessage.bind(this)} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
