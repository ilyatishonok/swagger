import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
    margin: auto;
    width: 60%;
    margin-top: 2rem;
`;

const Head = styled.h1`
    color: ${ props => props.theme.main };
`;

const InfoPage = () => (
    <Page>
        <Head>INFO</Head>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras adipiscing. Lacinia at quis risus sed vulputate odio ut. Risus pretium quam vulputate dignissim suspendisse. Tellus molestie nunc non blandit massa enim nec dui. At erat pellentesque adipiscing commodo elit. Maecenas volutpat blandit aliquam etiam erat. Velit ut tortor pretium viverra suspendisse potenti nullam. Placerat orci nulla pellentesque dignissim enim sit. Facilisis leo vel fringilla est ullamcorper eget.

            Interdum velit laoreet id donec ultrices tincidunt. Sagittis id consectetur purus ut. Id neque aliquam vestibulum morbi. Vestibulum mattis ullamcorper velit sed. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Hendrerit gravida rutrum quisque non tellus orci ac. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Tortor id aliquet lectus proin. Sodales ut eu sem integer. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Cum sociis natoque penatibus et magnis. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit.

            Vulputate mi sit amet mauris commodo quis imperdiet massa. Nec sagittis aliquam malesuada bibendum arcu vitae. Sed viverra ipsum nunc aliquet bibendum. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Viverra nibh cras pulvinar mattis. Vel turpis nunc eget lorem dolor sed viverra ipsum. Pretium nibh ipsum consequat nisl. Magna fermentum iaculis eu non diam phasellus. Ac auctor augue mauris augue neque gravida in. Fermentum iaculis eu non diam phasellus vestibulum. Iaculis urna id volutpat lacus laoreet non curabitur. Ac tincidunt vitae semper quis lectus nulla at. Pretium quam vulputate dignissim suspendisse in est ante in nibh. Nulla pellentesque dignissim enim sit amet venenatis urna. Suspendisse sed nisi lacus sed viverra tellus. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. In hac habitasse platea dictumst vestibulum rhoncus est. Iaculis at erat pellentesque adipiscing commodo elit. Vel pretium lectus quam id leo in vitae turpis.
        </p>
        <p>
            Ut ornare lectus sit amet est. Justo nec ultrices dui sapien eget. Hac habitasse platea dictumst vestibulum rhoncus. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Enim praesent elementum facilisis leo vel. Lacus sed viverra tellus in hac habitasse platea. Mauris cursus mattis molestie a iaculis at erat pellentesque. Etiam tempor orci eu lobortis elementum nibh tellus molestie. A diam sollicitudin tempor id eu nisl. Volutpat sed cras ornare arcu dui. Ut ornare lectus sit amet est placerat. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus.

            Feugiat vivamus at augue eget arcu dictum varius duis at. Amet est placerat in egestas erat imperdiet sed. Tincidunt id aliquet risus feugiat in ante. Vitae tortor condimentum lacinia quis vel eros. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Urna molestie at elementum eu facilisis sed odio morbi. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Neque egestas congue quisque egestas diam in arcu cursus euismod. A cras semper auctor neque vitae tempus quam pellentesque nec. Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa. Ornare quam viverra orci sagittis eu. Aliquam sem et tortor consequat id porta nibh. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Faucibus nisl tincidunt eget nullam non nisi est sit.
        </p>
    </Page>
);

export default InfoPage;