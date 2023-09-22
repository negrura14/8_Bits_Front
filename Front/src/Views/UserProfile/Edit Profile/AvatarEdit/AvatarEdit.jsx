import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function AvatarEdit() {

    const predefinedAvatars = [
        "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/s5g4pfeg3fnpsoe14tlw.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/ftme8psm1dbrgyjltb6w.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/weccmfsmynxh6pmgqi6s.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/yb9tp77q7ph83ascfg14.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/tliwx46fp9xmsdmdvp94.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/hkdublvnilabiywcafvm.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/kdvjin7jh1252k5cfxdt.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360323/Avatar%20Images/p2p95vmswyfkagjwkjov.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360322/Avatar%20Images/bhx0fkjzm7r44ayc5hbi.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360322/Avatar%20Images/dopteudvfe5up1yjqr2k.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360322/Avatar%20Images/p4os4tygfqxsh2yzw1ok.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/crwto7a9casuswgwvgj9.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/nqo4oal2hittbbutkdxk.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/jxgzljaj8cqjabk1hr5m.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/lgxpwkhmukzalf6hfhqi.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/tlptaz2zmcshkpza7knq.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/obqld0sy4cqmygibdxis.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/c60qyn3g71cauwwulmzo.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/phatrmwyzchqsf1vxx7m.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/ilr3kkdizyjn7dtp3nfm.jpg",
      ];
    
    return(
    //     <div>
    //         <ul>
    //     {predefinedAvatars.map((avatar, index) => (
    //       <li key={index} >
    //         <img src={avatar} alt={`Avatar ${index}`} onClick={() => onSelect(avatar)} style={{ maxWidth: '100px', maxHeight: '100px' }}/>
    //       </li>
    //     ))}
    //   </ul>
    //     </div>
    <Container>
      <Row>
        {/* <Col xs={6} md={4}>
          <Image src="holder.js/171x180" rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" roundedCircle />
        </Col> */}
        {predefinedAvatars.map((avatar,index) => (
            <Col xs={6} md={3}>
            <Image src={avatar} thumbnail style={{ maxWidth: '280px', maxHeight: '280px' }}/>
            </Col>
        ))}
      </Row>
    </Container>
    )
}