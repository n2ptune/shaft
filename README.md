# Shaft

카테고리를 이용해 주제를 정하고 그에 맞는 토픽을 작성하여 의견을 나눌 수 있는 커뮤니티 (Vue 풀스택 프로젝트)

## 기술 스택

아래 기술 혹은 프레임워크, 라이브러리를 활용해서 만들었습니다.

- Nuxt
- Express
- MySQL
- TailwindCSS
- QuillEditor
- JSONWebToken

## 배포

로컬에서 Nuxt를 Universal Mode로 빌드한 후 [Google Cloud Platform](https://cloud.google.com/)에서 제공하는 Google App Engine에 배포했습니다. AWS의 Elastic Beanstalk와 비슷한 기능을 하는 서비스입니다.

## 인증

클라이언트에서 사용자 아이디와 비밀번호로 서버에 로그인 요청을 할 때, 성공하면 서버에서는 **Access Token**과 **Refresh Token** 두 개를 만듭니다. **Refresh Token**는 사용자 데이터베이스에 저장하고, **Access Token**을 클라이언트에게 발급합니다.

클라이언트는 서버로부터 받은 **Access Token**을 브라우저 저장소인 **LocalStorage**에 저장합니다. 클라이언트가 서버에 인증이 필요한 요청을 하면 이 **Access Token**과 함께 요청합니다. 서버에서는 해당 토큰이 만료되었는지, 아직 만료되지 않았는지를 판단하여 서버의 자원을 응답합니다.

만약, **Access Token**이 만료되었다면 데이터베이스에 저장해두었던 **Refresh Token**으로 **Access Token**을 발급합니다. **Refresh Token**까지 만료되었다면 클라이언트에게 적절한 오류로 응답하여 다시 로그인해야된다고 알려줍니다. 프로젝트에서는 토큰의 만료 기간을 각각 1시간과 1주일로 정했습니다.
