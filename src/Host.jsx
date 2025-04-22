import { useState, useRef } from "react";
import { Button, Divider, Row, Col, Input, Form } from "antd";

function Host() {
  const [peerConnection, setPeerConnection] = useState(null);
  const [iceGatheringState, setIceGatheringState] = useState(null);
  const [connectionState, setConnectionState] = useState(null);
  const [signalingState, setSignalingState] = useState(null);
  const [iceCandidates, setIceCandidates] = useState([]);
  function createPeerConnection(event) {
    event.currentTarget.disabled = true;
    const configuration = {
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
    };
    const peerConnection = new RTCPeerConnection(configuration);
    setPeerConnection(peerConnection);
    setIceGatheringState(peerConnection.iceGatheringState);
    setConnectionState(peerConnection.connectionState);
    setSignalingState(peerConnection.signalingState);
    peerConnection.addEventListener("icegatheringstatechange", () => {
      setIceGatheringState(peerConnection.iceGatheringState);
    });

    peerConnection.addEventListener("connectionstatechange", () => {
      setConnectionState(peerConnection.connectionState);
    });

    peerConnection.addEventListener("signalingstatechange", () => {
      setSignalingState(peerConnection.signalingState);
    });

    peerConnection.addEventListener("icecandidate", (event) => {
      setIceCandidates((prev) => [...prev, event.candidate]);
    });

    peerConnection.addEventListener("track", (event) => {
      remoteVideoElement.current.srcObject = event.streams[0];
    });
  }

  const videoElement = useRef(null);
  const remoteVideoElement = useRef(null);
  async function shareScreen(event) {
    event.currentTarget.disabled = true;
    const stream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.current.srcObject = stream;
    peerConnection.addTrack(stream.getTracks()[0], stream);
  }

  const [offer, setOffer] = useState(null);
  async function createOffer(event) {
    event.currentTarget.disabled = true;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    setOffer(JSON.stringify(offer, "null", 2));
  }

  const remoteDescriptionRef = useRef(null);
  async function setRemoteDescription(event) {
    event.currentTarget.disabled = true;
    const remoteDesc = new RTCSessionDescription(
      JSON.parse(remoteDescriptionRef.current.resizableTextArea.textArea.value)
    );
    await peerConnection.setRemoteDescription(remoteDesc);
  }

  const iceCandidateRef = useRef(null);
  async function addIceCandidate(event) {
    event.currentTarget.disabled = true;
    const iceCandidate = new RTCIceCandidate(
      JSON.parse(iceCandidateRef.current.resizableTextArea.textArea.value)
    );
    await peerConnection.addIceCandidate(iceCandidate);
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <video ref={videoElement} autoPlay playsInline width="100%" />
        </Col>
        <Col span={12}>
          <video ref={remoteVideoElement} autoPlay playsInline width="100%" />
        </Col>
      </Row>
      <Divider />
      <Button onClick={createPeerConnection}>Create Peer Connection</Button>
      {peerConnection && (
        <ul>
          <li>
            Signaling State: <code>{signalingState}</code>
          </li>
          <li>
            ICE Gathering State: <code>{iceGatheringState}</code>
          </li>
          <li>
            Connection State: <code>{connectionState}</code>
          </li>
          <li>ICE Candidates:</li>
          <ul>
            {iceCandidates.map((candidate, index) => (
              <li key={index}>{JSON.stringify(candidate, "null", 2)}</li>
            ))}
          </ul>
        </ul>
      )}
      <Divider />
      <Button onClick={shareScreen}>Share Screen</Button>
      <Divider />
      <Button onClick={createOffer}>Create Offer</Button>
      {offer && <pre>{offer}</pre>}
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <Input.TextArea rows={4} ref={remoteDescriptionRef} />
        </Form.Item>
        <Button onClick={setRemoteDescription}>Set Remote Description</Button>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <Input.TextArea rows={4} ref={iceCandidateRef} />
        </Form.Item>
        <Button onClick={addIceCandidate}>Add ICE Candidate</Button>
      </Form>
    </div>
  );
}

export default Host;
