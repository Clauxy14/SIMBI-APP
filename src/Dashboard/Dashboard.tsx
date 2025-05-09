import React from 'react';
import styled from 'styled-components';
import _myNewImage from './assets/WELCOME, HAPPY.png';
import { FaCheckCircle, FaRobot, FaQuestionCircle, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa'; // Import necessary icons

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Adjust for header and main content */
  gap: 20px;
  padding: 20px;
`;

const DashboardHeader = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 15px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space out search and icons */
`;

const SearchContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  flex-grow: 1;
  margin-right: 20px;
  max-width: 400px; /* Limit the width of the search bar */
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 8px;
  font-size: 0.9em;
  width: 100%;
  outline: none;
`;

const SearchIcon = styled(FaSearch)`
  color: #666;
  margin-right: 10px;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Space between icons/buttons */
`;

const NotificationIcon = styled(FaBell)`
  color: #666;
  font-size: 1.1em;
  cursor: pointer;
`;

const UserAvatar = styled(FaUserCircle)`
  color: #0047FF;
  font-size: 1.5em;
  cursor: pointer;
`;

const ConnectWalletButton = styled.button`
  background-color: #0047FF;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 8px 15px;
  font-size: 0.9em;
  cursor: pointer;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WelcomeCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WelcomeText = styled.div`
  h2 {
    color: #333;
    margin-bottom: 8px;
    font-size: 1.5em;
    font-weight: bold;
  }
  p {
    color: #666;
    font-size: 0.9em;
  }
`;

const WelcomeImage = styled.img`
  width: 100px;
  height: auto;
`;

const DailyStreakCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 20px;
`;

const DailyStreakTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.1em;
  font-weight: bold;
`;

const DaysOfWeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-align: center;
`;

const DayItem = styled.div`
  color: #666;
  font-size: 0.85em;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 1.2em;
    margin-top: 5px;
    color: #0047FF;
  }
`;

const StudyPlanCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 20px;
`;

const StudyPlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StudyPlanTitle = styled.h3`
  color: #333;
  font-size: 1.1em;
  font-weight: bold;
`;

const ViewAllLinkStyled = styled.a`
  color: #0047FF;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.9em;

  &:hover {
    text-decoration: underline;
  }
`;

const StudyTasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
`;

const TaskCard = styled.div`
  background-color: #F0F8FF;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #E0EEFF;

  strong {
    display: block;
    margin-bottom: 5px;
    color: #0047FF;
    font-size: 0.95em;
    font-weight: bold;
  }

  div {
    font-size: 0.8em;
    color: #666;
  }
`;

const ProgressOverviewCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressOverviewTitle = styled.h3`
  color: #333;
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 15px;
`;

const CompletionRateCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #E0EEFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  strong {
    color: #0047FF;
    font-size: 1.8em;
  }
`;

const CompletionText = styled.span`
  color: #666;
  font-size: 0.8em;
`;

const SubjectProgressList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 0.8em;
    color: #333;

    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
`;

const QuickActionsCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 20px;
`;

const QuickActionsTitle = styled.h3`
  color: #333;
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 15px;
`;

const QuickActionsButtonStyled = styled.button`
  background-color: #E0EEFF;
  color: #0047FF;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 0.9em;
  cursor: pointer;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #0047FF;
    color: white;
  }
`;

interface DashboardProps {
  welcomeImage: string;
}

const Dashboard: React.FC<DashboardProps> = ({ welcomeImage }) => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <SearchContainer>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </SearchContainer>
        <HeaderIcons>
          <NotificationIcon />
          <UserAvatar />
          <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
        </HeaderIcons>
      </DashboardHeader>
      <MainContent>
        <LeftSection>
          <WelcomeCard>
            <WelcomeText>
              <h2>Hi, Tifechi!</h2>
              <p>Ready to make today count? Let's hit those study goals — one step at a time</p>
            </WelcomeText>
            <WelcomeImage src={welcomeImage} alt="Welcome Illustration" />
          </WelcomeCard>

          <DailyStreakCard>
            <DailyStreakTitle>Daily Streak</DailyStreakTitle>
            <DaysOfWeekGrid>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <DayItem key={day}>
                  {day}
                  <FaCheckCircle />
                </DayItem>
              ))}
            </DaysOfWeekGrid>
          </DailyStreakCard>

          <StudyPlanCard>
            <StudyPlanHeader>
              <StudyPlanTitle>Today's Study Plan</StudyPlanTitle>
              <ViewAllLinkStyled href="#">View All</ViewAllLinkStyled>
            </StudyPlanHeader>
            <StudyTasksGrid>
              <TaskCard>
                <strong>English Language</strong>
                <div>Lexis and Structure</div>
                <div>10:00 am - 11:00 am</div>
              </TaskCard>
              <TaskCard>
                <strong>Quiz: Tenses</strong>
                <div>Practice Test on Present, Past and Present Continuous Tenses</div>
                <div>3:30 pm - 4:00 pm</div>
              </TaskCard>
            </StudyTasksGrid>
          </StudyPlanCard>
        </LeftSection>

        <RightSection>
          <ProgressOverviewCard>
            <ProgressOverviewTitle>Progress Overview</ProgressOverviewTitle>
            <CompletionRateCircle>
              <strong>100%</strong>
            </CompletionRateCircle>
            <CompletionText>Completion Rate</CompletionText>
            <SubjectProgressList>
              <li style={{ color: "#FF6347" }}>
                <span style={{ backgroundColor: "#FF6347" }}></span> Maths 12.5%
              </li>
              <li style={{ color: "#4682B4" }}>
                <span style={{ backgroundColor: "#4682B4" }}></span> English 25%
              </li>
              <li style={{ color: "#3CB371" }}>
                <span style={{ backgroundColor: "#3CB371" }}></span> Chemistry 43.75%
              </li>
              <li style={{ color: "#FFA07A" }}>
                <span style={{ backgroundColor: "#FFA07A" }}></span> Biology 18.75%
              </li>
            </SubjectProgressList>
          </ProgressOverviewCard>

          <QuickActionsCard>
            <QuickActionsTitle>Quick Actions</QuickActionsTitle>
            <QuickActionsButtonStyled>
              <FaRobot /> Ask SIMBI
            </QuickActionsButtonStyled>
            <QuickActionsButtonStyled>
              <FaQuestionCircle /> Take Quiz
            </QuickActionsButtonStyled>
          </QuickActionsCard>
        </RightSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;