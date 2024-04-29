<template>
  <body>
    <section class="about-us">
      <div class="main-img">
        <img src="https://fadeawayworld.net/.image/t_share/MTkyNzcwOTU5OTY5NjI1NDYw/310507707_678885953228947_2630696704177793789_n.jpg" alt="">
      </div>

      <div class="text">
        <h4>About Us</h4>
        <h1>Manny Pacquaio's <br> Basketball League</h1>
        <hr>
        <p>
          Manny Pacquiao's Basketball League (MPBL) is a premier basketball league in the Philippines, founded by boxing icon Manny Pacquiao. Established in 2024, MPBL showcases a unique blend of professional and amateur players, fostering community pride and camaraderie. Beyond the game, MPBL is dedicated to social responsibility and youth empowerment. Join us as we celebrate Filipino basketball and community spirit.
        </p>
        <!-- <div class="last-text">
          <div class="text1">
            <h3>500+</h3>
            <h5>Ligang Natapos</h5>
          </div>
        </div> -->
      
      </div>

      <div class="main-img">
        <img src="/src/assets/marc.jpg" alt="marc's pic">
      </div>

      <div class="text">
        <h4>commissioner</h4>
        <h1>Marc Emmanuel Ramos </h1>
        <hr>
        <p>
          Marc Emmanuel Ramos, a dynamic leader with a passion for basketball, serves as the commissioner of Manny Pacquiao's Basketball League (MPBL). His visionary leadership has propelled the league to new heights, emphasizing integrity, fairness, and community engagement. Under Ramos' guidance, [League Name] has flourished, fostering talent development and social impact initiatives. Join us as we continue to elevate the game under Ramos' inspired leadership.
        </p>
      </div>
      <div class="main-img">
        <img src="/src/assets/rylan.jpg" alt="ry's pic">
      </div>

      <div class="text">
        <h4>Committee</h4>
        <h1>Rylan Angelico Tioco</h1>
        <hr>
        <p>
          Rylan Angelico Tioco, a dedicated member of the MPBL committee, brings expertise and passion to his role. With a background in sports management, Tioco plays a key part in league operations, from logistics to event coordination. He's committed to advancing Filipino basketball, promoting player welfare, and empowering communities through the sport. Tioco's leadership drives MPBL's mission of excellence and inclusivity, inspiring athletes and uniting communities.
        </p>
      </div>
    </section>
  </body>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
body {
  background-color: #111317;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

section{
  padding: 4% 10%;
}
.about-us{
  width: 100%;
  /* height: 100vh; */
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 4rem;
}
.main-img img{
  max-width: 100%;
  width: 560px;
  height: auto;
}

.text{
  padding: 6% 0;
}

.text h4{
  color: #ce1446;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.text h1{
  color: #fff;
  font-size: 36px;
  text-transform: capitalize;
  font-weight: 700;
  line-height: 46px;
  margin-bottom: 30px;
}

hr{
  width: 30%;
  border: none;
  height: 2px;
  background-color: #ce1446;
  margin-bottom: 50px;
}

.text p{
  max-width: 600px;
  color: #fff;
  font-size: 15px;
  font-weight: 1.7;
  margin-bottom: 60px;
}

.last-test{
  display: flex;
}

.text1{
  margin-right: 60px;
}

.text2{
  margin-right: 100px;
}
.last-text h3{
  color:#ce1446;
  font-size: 60px;
  font-weight: 700;
}

.last-text h5{
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
}
</style>