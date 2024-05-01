<template>
  <main>
    <body>
      <header class="section__container header__container">
      <div class="header__content">
        <span class="bg__blur"></span>
        <span class="bg__blur header__blur"></span>
        <h4>REPRESENTING BATANG GEN SAN</h4>
        <h1><span>MANNY PACQUIAO'S</span> BASKETBALL LEAGUE</h1>
        <p>
          Welcome to Manny's Basketball League, where the court is your canvas and the game is your masterpiece. 
          Join us in unleashing your potential on the hardwood as you embark on a journey towards a stronger, fitter, 
          and more confident version of yourself.
        </p>
      </div>
      <div class="header__image">
        <img src="https://b.fssta.com/uploads/application/boxing/headshots/66.png" alt="header" />
      </div>
    </header>

    <section class="section__container explore__container">
      <div class="explore__header">
        <h2 class="section__header">LEAGUE CORE VALUES</h2>
      </div>
      <div class="explore__grid">
        <div class="explore__card">
          <span><i class="ri-boxing-fill"></i></span>
          <h4>Dedication</h4>
          <p>
            It's the unwavering commitment to excellence, the relentless pursuit of improvement, and the resilience to push past obstacles. 
          </p>
        </div>
        <div class="explore__card">
          <span><i class="ri-heart-pulse-fill"></i></span>
          <h4>Physical Fitness</h4>
          <p>
            It encompasses a range of activities that improve health, strength,
            flexibility, and overall well-being.
          </p>
        </div>
        <div class="explore__card">
          <span><i class="ri-run-line"></i></span>
          <h4>Hardwork</h4>
          <p>
            It's the early morning practices, the extra reps in the gym, and the relentless pursuit of greatness
          </p>
        </div>
        <div class="explore__card">
          <span><i class="ri-shopping-basket-fill"></i></span>
          <h4>Relentless</h4>
          <p>
            It's the tireless pursuit of victory, the refusal to back down, and the determination to overcome any obstacle in your path.
          </p>
        </div>
      </div>
    </section>

    <section class="section__container class__container">
      <div class="class__image">
        <span class="bg__blur"></span>
        <img src="https://images.gmanews.tv/v3/webpics/v3/2014/10/2014_10_19_17_03_14_01.jpg" alt="class" class="class__img-1" />
        <img src="https://ca-times.brightspotcdn.com/dims4/default/644a4ec/2147483647/strip/true/crop/1200x700+0+0/resize/1200x700!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb2%2F0b%2Fbe68fcb8b773b0fa02f6897777a1%2Fla-sp-sn-manny-pacquiao-basketball-mayweather-001" alt="class" class="class__img-2" />
      </div>
      <div class="class__content">
        <h2 class="section__header">LOVE OF THE GAME</h2>
        <p>
          Experience the thrill of competition like never before with Manny's Basketball League. 
          Our league is home to passionate players and dynamic teams, all driven by a shared love for the game. 
          Led by seasoned coaches and fueled by the camaraderie of teammates, 
          each game is an exhilarating journey of skill, strategy, and sportsmanship. 
        </p>
      </div>
    </section>

    <section class="section__container join__container">
      <h2 class="section__header">TEST NOW</h2>
      <p class="section__subheader">
        Our diverse website base creates a friendly and supportive
        atmosphere, where you can make players and teams.
      </p>
      <div class="join__image">
        <img src="https://c1.wallpaperflare.com/preview/920/797/98/manny-pacquiao-boxer-boxing-athlete.jpg" alt="Join" />
        <div class="join__grid">
          <div class="join__card">
            <span><i class="ri-user-star-fill"></i></span>
            <div class="join__card__content">
              <h4>Players</h4>
              <p>Add your favorite players into your lineup.</p>
            </div>
          </div>
          <div class="join__card">
            <span><i class="ri-vidicon-fill"></i></span>
            <div class="join__card__content">
              <h4>Teams</h4>
              <p>Create and expand teams based on regions.</p>
            </div>
          </div>
          <div class="join__card">
            <span><i class="ri-building-line"></i></span>
            <div class="join__card__content">
              <h4>Scoreboard</h4>
              <p>Control the score and time within your hands.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    </body>
  </main>
</template>

<style scoped>
main{
  background-color: rgb(37, 37, 37);

}

.header__container {
  position: relative;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;
}

.header__container::before {
  content: "MAHARLIKA";
  position: absolute;
  bottom: 5rem;
  right: 20rem;
  font-size: 10rem;
  font-weight: 700;
  line-height: 7rem;
  color: #ffffff;
  opacity: 0.1;
  z-index: -0.3;
}

.header__blur {
  bottom: 5rem;
  right: 0;
}

.header__content h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #FF0B01;
}

.header__content h1 {
  margin-bottom: 1rem;
  font-size: 5rem;
  font-weight: 700;
  line-height: 6rem;
  color: #ffffff;
}

.header__content h1 span {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #ffffff;
}

.header__content p {
  margin-bottom: 2rem;
  color: #d1d5db;
}

.header__image {
  position: relative;
}

.header__image::before {
  content: "O";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40rem;
  font-weight: 400;
  line-height: 20rem;
  color: rgb(147, 38, 38);
  opacity: 0.1;
  z-index: -0.1;
}

.header__image img {
  max-width: 350px;
  margin: auto;
}

.explore__header {
  margin: auto;
  width: 50%;
  padding: 10px;
}

.explore__grid {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.explore__card {
  padding: 1rem;
  background-color: #1f2125;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: 0.3s ease;
}

.explore__card:hover {
  background-color: #35373b;
  border-color: #034AAD;
}

.explore__card span {
  display: inline-block;
  padding: 2px 9px;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  color: #ffffff;
  background-color: #FF0B01;
  border-radius: 5px;
}

.explore__card h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.explore__card p {
  margin-bottom: 1rem;
  color: #ffffff;
}

.explore__card a {
  color: #ffffff;
  transition: 0.3s;
}

.explore__card a:hover {
  color: rgb(147, 38, 38);
}

.class__container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.class__image {
  position: relative;
}

.class__image .class__img-1 {
  position: absolute;
  right: 0;
  top: 0;
  max-width: 500px;
  border-radius: 10px;
}

.class__image .class__img-2 {
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 300px;
  border-radius: 10px;
}

.class__content {
  padding: 2rem 0;
  color: white;
}

.class__content .section__header {
  text-align: left;
  max-width: 400px;
}

.class__content p {
  margin-bottom: 1rem;
  color: #ffffff;
}

.join__image {
  position: relative;
  left: 130px;
  margin-top: 3rem;
  position: relative;
}

.join__image img {
  border-radius: 10px;
}

.join__grid {
  position: absolute;
  left: -130px;
  bottom: -5rem;
  width: calc(100% - 4rem);
  padding: 2rem;
  margin: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background-color: #1f2125;
  border-radius: 10px;
}

.join__card {
  flex: 1 1 250px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.join__card span {
  padding: 5px 12px;
  font-size: 1.75rem;
  color:  #ffffff;
  background-color: #FF0B01;
  border-radius: 5px;
}

.join__card h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #ffffff;
}

.join__card p {
  color: #d1d5db;
}

.section__container {
  max-width: 1200px;
  margin: auto;
  padding: 5rem 1rem;
}

.section__header {
  margin-bottom: 1rem;
  font-size: 2.25rem;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
}

.section__subheader {
  max-width: 600px;
  margin: auto;
  text-align: center;
  color: #d1d5db;
}

</style>