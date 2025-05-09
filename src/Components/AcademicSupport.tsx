// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import styled from "styled-components";
// import Dashboard from '../Dashboard/Dashboard';

// import myNewImage from './assets/WELCOME, HAPPY.png';

// import {
//     FaTachometerAlt,
//     FaRobot,
//     FaQuestionCircle,
//     FaChartLine,
//     FaTrophy,
//     FaBookOpen,
//     FaSearch,
//     FaCloudUploadAlt,
//     FaBell,
//     FaUserCircle
// } from "react-icons/fa";

// import image from '../components/assets/img.png';
// import imgage from './assets/img2.png';

// interface SidebarItemRootProps {
//     selected?: boolean;
// }

// const primaryColor = "#0047FF";
// const secondaryColor = "#E0EEFF";
// const textColor = "#333";
// const lightTextColor = "#666";
// const backgroundColor = "#F8F9FA";
// const cardBackgroundColor = "#fff";
// const boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
// const borderRadius = "8px";
// const transition = "0.3s ease";

// const Sidebar = styled(motion.div)`
//     width: 220px;
//     background-color: ${cardBackgroundColor};
//     color: ${textColor};
//     padding: 20px;
//     border-right: 1px solid #e0e0e0;
//     position: sticky;
//     top: 0;
//     height: 100vh;
//     overflow-y: auto;
// `;

// const SidebarTitle = styled.div`
//     margin-bottom: 30px;
//     font-size: 24px;
//     font-weight: bold;
//     color: ${primaryColor};
// `;

// const SidebarItemRoot = styled(motion.div)<SidebarItemRootProps>`
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 12px 15px;
//     cursor: pointer;
//     background-color: ${(props) => (props.selected ? primaryColor : "transparent")};
//     color: ${(props) => (props.selected ? "white" : textColor)};
//     border-radius: ${borderRadius};
//     margin-bottom: 15px;
//     transition: background-color ${transition}, color ${transition};
//     &:hover {
//         background-color: ${secondaryColor};
//         color: ${primaryColor};
//     }
//     svg {
//         font-size: 1.2em;
//     }
// `;

// const SidebarItem = ({ icon: Icon, label, selected, onClick }: any) => (
//     <SidebarItemRoot
//         onClick={onClick}
//         selected={selected}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//     >
//         <Icon />
//         <span>{label}</span>
//     </SidebarItemRoot>
// );

// const MainContent = styled.div`
//     flex: 1;
//     padding: 30px;
//     overflow-y: auto;
//     background-color: ${backgroundColor};
// `;

// const Header = styled.h1`
//     font-size: 28px;
//     font-weight: bold;
//     color: ${primaryColor};
//     margin-bottom: 20px;
// `;

// const SearchContainer = styled.div`
//     background-color: ${cardBackgroundColor};
//     border-radius: ${borderRadius};
//     box-shadow: ${boxShadow};
//     padding: 15px;
//     margin-bottom: 20px;
//     display: flex;
//     align-items: center;
// `;

// const SearchInput = styled.input`
//     flex: 1;
//     padding: 10px;
//     font-size: 16px;
//     border: none;
//     outline: none;
// `;

// const SearchButton = styled.button`
//     background-color: transparent;
//     border: none;
//     color: ${lightTextColor};
//     cursor: pointer;
//     padding: 8px;
//     font-size: 1.2em;
// `;

// const CategoryButtonsContainer = styled.div`
//     margin-bottom: 20px;
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
// `;

// const CategoryButton = styled.button`
//     padding: 8px 16px;
//     background-color: ${secondaryColor};
//     border: none;
//     border-radius: 20px;
//     font-size: 14px;
//     cursor: pointer;
//     transition: background-color ${transition}, color ${transition};
//     color: ${textColor};

//     &:hover {
//         background-color: ${primaryColor};
//         color: white;
//     }
// `;

// const QuizGenerator = styled.div`
//     background-color: ${cardBackgroundColor};
//     padding: 20px;
//     border-radius: 12px;
//     margin-bottom: 30px;
//     box-shadow: ${boxShadow};
// `;

// const QuizGeneratorTitle = styled.h3`
//     margin-bottom: 15px;
//     color: ${textColor};
// `;

// const QuizGeneratorForm = styled.div`
//     display: grid;
//     grid-template-columns: auto 1fr auto;
//     gap: 15px 20px;
//     align-items: center;
// `;

// const FormGroup = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const Label = styled.label`
//     font-weight: bold;
//     color: ${lightTextColor};
//     margin-bottom: 5px;
// `;

// const Select = styled.select`
//     padding: 8px;
//     border-radius: ${borderRadius};
//     border: 1px solid #ccc;
//     transition: border-color ${transition};
//     font-size: 16px;
// `;

// const DifficultyRange = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 10px;
// `;

// const DifficultyLabel = styled.span`
//     font-size: 14px;
//     color: ${lightTextColor};
// `;

// const InputRange = styled.input`
//     flex: 1;
//     -webkit-appearance: none;
//     height: 8px;
//     border-radius: 5px;
//     background: #d3d3d3;
//     outline: none;
//     transition: background ${transition};

//     &::-webkit-slider-thumb {
//         -webkit-appearance: none;
//         appearance: none;
//         width: 15px;
//         height: 15px;
//         border-radius: 50%;
//         background: ${primaryColor};
//         cursor: pointer;
//     }

//     &::-moz-range-thumb {
//         width: 15px;
//         height: 15px;
//         border-radius: 50%;
//         background: ${primaryColor};
//         cursor: pointer;
//     }
// `;

// const NumberOfQuestions = styled.div`
//     display: flex;
//     align-items: center;
// `;

// const NumberInput = styled.input`
//     width: 40px;
//     padding: 6px;
//     border-radius: 6px;
//     border: 1px solid #ccc;
//     text-align: center;
// `;

// const GenerateButton = styled.button`
//     padding: 10px 20px;
//     background-color: ${primaryColor};
//     color: white;
//     border: none;
//     border-radius: ${borderRadius};
//     font-size: 16px;
//     cursor: pointer;
//     transition: background-color ${transition};

//     &:hover {
//         background-color: #0033cc;
//     }
// `;

// const UploadButton = styled.label` /* Changed to label */
//     background-color: transparent;
//     border: 1px solid ${lightTextColor};
//     color: ${lightTextColor};
//     padding: 8px 15px;
//     border-radius: ${borderRadius};
//     font-size: 14px;
//     cursor: pointer;
//     transition: border-color ${transition}, color ${transition};
//     display: flex;
//     align-items: center;
//     gap: 5px;

//     &:hover {
//         border-color: ${primaryColor};
//         color: ${primaryColor};
//     }
// `;

// const RecentQuizzesContainer = styled.div`
//     margin-bottom: 30px;
// `;

// const RecentQuizzesHeader = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 15px;
// `;

// const RecentQuizzesTitle = styled.h3`
//     color: ${textColor};
// `;

// const ViewAllLink = styled.a`
//     color: ${primaryColor};
//     font-weight: bold;
//     text-decoration: none;

//     &:hover {
//         text-decoration: underline;
//     }
// `;

// const QuizCardGrid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//     gap: 20px;
// `;

// const QuizCard = styled(motion.div)`
//     background-color: ${secondaryColor};
//     border-radius: 12px;
//     padding: 15px;
//     min-width: 250px;

//     strong {
//         font-size: 1.1em;
//         color: ${primaryColor};
//         display: block;
//         margin-bottom: 5px;
//     }

//     div {
//         font-size: 0.9em;
//         color: ${lightTextColor};
//         margin-bottom: 5px;
//     }

//     .progress-bar-container {
//         background-color: #d3d3d3;
//         border-radius: 5px;
//         height: 8px;
//         margin-bottom: 5px;
//         overflow: hidden;
//     }

//     .progress-bar {
//         background-color: #4CAF50;
//         height: 100%;
//         border-radius: 5px;
//     }

//     .score {
//         font-size: 0.85em;
//         text-align: right;
//         color: ${textColor};
//     }

//     .actions button {
//         background-color: ${cardBackgroundColor};
//         color: ${primaryColor};
//         border: 1px solid ${primaryColor};
//         padding: 6px 10px;
//         border-radius: ${borderRadius};
//         cursor: pointer;
//         margin-right: 5px;
//         font-size: 0.8em;
//         transition: background-color ${transition}, color ${transition};

//         &:hover {
//             background-color: ${primaryColor};
//             color: white;
//         }
//     }
// `;

// const RecommendedResourcesContainer = styled.div`
//     margin-top: 30px;
// `;

// const RecommendedResourcesTitle = styled.h3`
//     color: ${textColor};
//     margin-bottom: 15px;
// `;

// const StudyMaterialGrid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//     gap: 20px;
// `;

// const StudyMaterialCard = styled(motion.div)`
//     background-color: ${cardBackgroundColor};
//     border-radius: 12px;
//     box-shadow: ${boxShadow};
//     overflow: hidden;

//     img {
//         width: 100%;
//         height: 120px;
//         object-fit: cover;
//     }

//     .content {
//         padding: 15px;
//         display: flex;
//         flex-direction: column;
//         gap: 10px;
//     }

//     strong {
//         color: ${primaryColor};
//         font-size: 1em;
//     }

//     .academy {
//         color: ${lightTextColor};
//         font-size: 0.9em;
//     }

//     p {
//         font-size: 0.9em;
//         color: ${textColor};
//     }

//     button {
//         background-color: ${secondaryColor};
//         color: ${primaryColor};
//         border: none;
//         padding: 8px 15px;
//         border-radius: ${borderRadius};
//         cursor: pointer;
//         font-size: 0.9em;
//         transition: background-color ${transition}, color ${transition};

//         &:hover {
//             background-color: ${primaryColor};
//             color: white;
//         }
//     }
// `;

// const PageHeader = styled.div`
//     background-color: ${cardBackgroundColor};
//     padding: 15px 20px;
//     margin-bottom: 20px;
//     border-radius: ${borderRadius};
//     box-shadow: ${boxShadow};
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
// `;

// const HeaderIcons = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 15px;
// `;

// const NotificationIconStyled = styled(FaBell)`
//     font-size: 1.3em;
//     color: ${lightTextColor};
//     cursor: pointer;
// `;

// const UserAvatarStyled = styled(FaUserCircle)`
//     font-size: 1.8em;
//     color: ${primaryColor};
//     cursor: pointer;
// `;

// const ConnectWalletButtonStyled = styled.button`
//     background-color: ${primaryColor};
//     color: white;
//     border: none;
//     border-radius: 15px;
//     padding: 8px 15px;
//     cursor: pointer;
//     font-size: 0.9em;
// `;

// const AcademicSupport: React.FC = () => {
//     const [activeTab, setActiveTab] = useState("academic");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficulty, setDifficulty] = useState(1);
//     const [numQuestions, setNumQuestions] = useState(10);
//     const [quizzes, _setQuizzes] = useState([
//         { title: "Biology", date: "May 1, 2025", questions: 10, time: "15 min", score: 85 },
//         { title: "Mathematics", date: "Apr 25, 2025", questions: 15, time: "25 min", score: 70 },
//         { title: "Languages", date: "Apr 20, 2025", questions: 12, time: "20 min", score: 92 },
//     ]);
//     const [studyMaterials, _setStudyMaterials] = useState([
//         { title: "Mastering human system", academy: "Khan Academy", desc: "Learn strategies for solving human body system", image: image },
//         { title: "Select Book to read", academy: "Genesis Academy", desc: "This video explains the fundamentals of Biology", image: imgage },
//     ]);

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//         console.log("Searching for:", event.target.value);
//     };

//     const handleGenerateQuiz = () => {
//         alert(`Generating quiz with difficulty: ${difficulty} and ${numQuestions} questions`);
//     };

//     const handleUploadMaterial = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             alert(`File "${file.name}" uploaded!`);
//             // In a real application, you would handle the file upload here
//             console.log("Uploaded file:", file);
//         }
//     };

//     const handleAddToStudyPlan = (title: string) => {
//         alert(`"${title}" added to your study plan!`);
//     };

//     const renderAcademicSupportContent = () => (
//         <>
//             <PageHeader>
//                 <Header></Header>
//                 <HeaderIcons>
//                     <NotificationIconStyled />
//                     <UserAvatarStyled />
//                     <ConnectWalletButtonStyled>Connect Wallet</ConnectWalletButtonStyled>
//                 </HeaderIcons>
//             </PageHeader>
//             <SearchContainer>
//                 <SearchInput
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     placeholder="Ask SIMBI anything about your studies"
//                 />
//                 <SearchButton>
//                     {/* @ts-ignore */}
//                     <FaSearch />
//                 </SearchButton>
//             </SearchContainer>
//             <CategoryButtonsContainer>
//                 {["English Language", "Maths", "Biology", "+ More"].map((subj) => (
//                     <CategoryButton key={subj}>{subj}</CategoryButton>
//                 ))}
//             </CategoryButtonsContainer><QuizGenerator>
//                 <QuizGeneratorTitle>Generate a Quiz</QuizGeneratorTitle>
//                 <QuizGeneratorForm>
//                     <FormGroup>
//                         <Label htmlFor="topic">Topic</Label>
//                         <Select id="topic">
//                             <option>Biology</option>
//                             <option>Maths</option>
//                             <option>English</option>
//                         </Select>
//                     </FormGroup>
//                     <div></div>
//                     <FormGroup>
//                         <UploadButton htmlFor="upload-material">
//                             <FaCloudUploadAlt /> Upload study Material
//                         </UploadButton>
//                         <input
//                             id="upload-material"
//                             type="file"
//                             style={{ display: 'none' }}
//                             onChange={handleUploadMaterial}
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor="difficulty">Difficulty Level</Label>
//                         <DifficultyRange>
//                             <DifficultyLabel>Beginner</DifficultyLabel>
//                             <InputRange
//                                 type="range"
//                                 id="difficulty"
//                                 min={1}
//                                 max={3}
//                                 value={difficulty}
//                                 onChange={(e) => setDifficulty(parseInt(e.target.value))}
//                             />
//                             <DifficultyLabel>Advanced</DifficultyLabel>
//                         </DifficultyRange>
//                     </FormGroup>
//                     <div></div>
//                     <GenerateButton onClick={handleGenerateQuiz}>Generate a Quiz</GenerateButton>
//                     <FormGroup>
//                         <Label htmlFor="numQuestions">Number of Questions</Label>
//                         <NumberOfQuestions>
//                             <button onClick={() => setNumQuestions(Math.max(1, numQuestions - 1))}>-</button>
//                             <NumberInput
//                                 type="number"
//                                 id="numQuestions"
//                                 value={numQuestions}
//                                 onChange={(e) => setNumQuestions(parseInt(e.target.value))}
//                             />
//                             <button onClick={() => setNumQuestions(numQuestions + 1)}>+</button>
//                         </NumberOfQuestions>
//                     </FormGroup>
//                     <div></div>
//                 </QuizGeneratorForm>
//             </QuizGenerator>
//             <RecentQuizzesContainer>
//                 <RecentQuizzesHeader>
//                     <RecentQuizzesTitle>Recent Quizzes</RecentQuizzesTitle>
//                     <ViewAllLink href="#">View All</ViewAllLink>
//                 </RecentQuizzesHeader>
//                 <QuizCardGrid>
//                     {quizzes.map((quiz) => (
//                         <QuizCard key={quiz.title}>
//                             <strong>{quiz.title}</strong>
//                             <div>{quiz.date}</div>
//                             <div>{quiz.questions} Questions</div>
//                             <div>{quiz.time}</div>
//                             <div className="progress-bar-container">
//                                 <div className="progress-bar" style={{ width: `${quiz.score}%` }}></div>
//                             </div>
//                             <div className="score">Score: {quiz.score}%</div>
//                             <div className="actions">
//                                 <button>Review</button>
//                                 <button>Retry</button>
//                             </div>
//                         </QuizCard>
//                     ))}
//                 </QuizCardGrid>
//             </RecentQuizzesContainer>
//             <RecommendedResourcesContainer>
//                 <RecommendedResourcesTitle>Recommended Resources</RecommendedResourcesTitle>
//                 <StudyMaterialGrid>
//                     {studyMaterials.map((item) => (
//                         <StudyMaterialCard key={item.title}>
//                             <img src={item.image} alt={item.title} />
//                             <div className="content">
//                                 <strong>{item.title}</strong>
//                                 <div className="academy">{item.academy}</div>
//                                 <p>{item.desc}</p>
//                                 <button onClick={() => handleAddToStudyPlan(item.title)}>Add to Study Plan</button>
//                             </div>
//                         </StudyMaterialCard>
//                     ))}
//                 </StudyMaterialGrid>
//             </RecommendedResourcesContainer>
//         </>
//     );

//     const renderDashboardContent = () => (
//         <>
//             <Dashboard welcomeImage={myNewImage} />
//         </>
//     );

//     const renderAskSIMBIContent = () => (
//         <>
//             <PageHeader>
//                 <Header>Ask SIMBI</Header>
//                 <HeaderIcons>
//                     <NotificationIconStyled />
//                     <UserAvatarStyled />
//                     <ConnectWalletButtonStyled>Connect Wallet</ConnectWalletButtonStyled>
//                 </HeaderIcons>
//             </PageHeader>
//             <div>
//                 <h2>Ask SIMBI page</h2>
//             </div>
//         </>
//     );

//     const renderQuizzesContent = () => (
//         <>
//             <PageHeader>
//                 <Header>Quizzes</Header>
//                 <HeaderIcons>
//                     <NotificationIconStyled />
//                     <UserAvatarStyled />
//                     <ConnectWalletButtonStyled>Connect Wallet</ConnectWalletButtonStyled>
//                 </HeaderIcons>
//             </PageHeader>
//             <div>
//                 <h2>Quizzes page</h2>
//             </div>
//         </>
//     );

//     const renderProgressContent = () => (
//         <>
//             <PageHeader>
//                 <Header>Progress</Header>
//                 <HeaderIcons>
//                     <NotificationIconStyled />
//                     <UserAvatarStyled />
//                     <ConnectWalletButtonStyled>Connect Wallet</ConnectWalletButtonStyled>
//                 </HeaderIcons>
//             </PageHeader>
//             <div>
//                 <h2>Progress page</h2>
//             </div>
//         </>
//     );

//     const renderTrophyRoomContent = () => (
//         <>
//             <PageHeader>
//                 <Header>Trophy Room</Header>
//                 <HeaderIcons>
//                     <NotificationIconStyled />
//                     <UserAvatarStyled />
//                     <ConnectWalletButtonStyled>Connect Wallet</ConnectWalletButtonStyled>
//                 </HeaderIcons>
//             </PageHeader>
//             <div>
//                 <h2>Trophy Room page</h2>
//             </div>
//         </>
//     );

//     const renderStudyPlanContent = () => (
//         <>
//             <PageHeader>
//                 <Header>Study Plan</Header>
//                 <HeaderIcons>
//                     <NotificationIconStyled />
//                     <UserAvatarStyled />
//                     <ConnectWalletButtonStyled>Connect Wallet</ConnectWalletButtonStyled>
//                 </HeaderIcons>
//             </PageHeader>
//             <div>
//                 <h2>Study Plan page</h2>
//             </div>
//         </>
//     );

//     const renderContent = () => {
//         switch (activeTab) {
//             case "dashboard":
//                 return renderDashboardContent();
//             case "academic":
//                 return renderAcademicSupportContent();
//             case "ask":
//                 return renderAskSIMBIContent();
//             case "quizzes":
//                 return renderQuizzesContent();
//             case "progress":
//                 return renderProgressContent();
//             case "trophy":
//                 return renderTrophyRoomContent();
//             case "study":
//                 return renderStudyPlanContent();
//             default:
//                 return renderDashboardContent();
//         }
//     };

//     return (
//         <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
//             <Sidebar
//                 initial={{ x: -250, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -250, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 20, damping: 20 }}
//             >
//                 <SidebarTitle>
//                     SIMBI
//                 </SidebarTitle>
//                 <SidebarItem
//                     icon={FaTachometerAlt}
//                     label="Dashboard"
//                     selected={activeTab === "dashboard"}
//                     onClick={() => setActiveTab("dashboard")}
//                 />
//                 <SidebarItem
//                     icon={FaRobot}
//                     label="Ask SIMBI"
//                     selected={activeTab === "ask"}
//                     onClick={() => setActiveTab("ask")}
//                 />
//                 <SidebarItem
//                     icon={FaQuestionCircle}
//                     label="Academic Support"
//                     selected={activeTab === "academic"}
//                     onClick={() => setActiveTab("academic")}
//                 />
//                 <SidebarItem
//                     icon={FaQuestionCircle}
//                     label="Quizzes"
//                     selected={activeTab === "quizzes"}
//                     onClick={() => setActiveTab("quizzes")}
//                 />
//                 <SidebarItem
//                     icon={FaChartLine}
//                     label="Progress"
//                     selected={activeTab === "progress"}
//                     onClick={() => setActiveTab("progress")}
//                 />
//                 <SidebarItem
//                     icon={FaTrophy}
//                     label="Trophy Room"
//                     selected={activeTab === "trophy"}
//                     onClick={() => setActiveTab("trophy")}
//                 />
//                 <SidebarItem
//                     icon={FaBookOpen}
//                     label="Study Plan"
//                     selected={activeTab === "study"}
//                     onClick={() => setActiveTab("study")}
//                 />
//             </Sidebar>
//             <MainContent>
//                 {renderContent()}
//             </MainContent>
//         </div>
//     );
// };

// export default AcademicSupport;
