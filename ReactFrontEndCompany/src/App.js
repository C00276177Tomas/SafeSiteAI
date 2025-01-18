// By: Tomas Smitas
// Date: 2024
// Development: Assisted by chatGPT

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import githubLogo from './images/github.png';
import linkedInLogo from './images/linkedIn.png';
<<<<<<< HEAD
import siteSafeLogo from './images/SiteSafeLogo.png';
import NoHelmet from './images/1NoHelmet.jpg';
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import AddUser from "./AddUser";
import PrivateRoute from "./PrivateRoute";
=======
import level1Assembly from './images/level1AssemblyProject.png';
import level2Assembly from './images/level2AssemblyProject.png';
import codeAssembly from './images/codeAssemblyProject.png';
import rootMeanSquareError from './images/RootMeanSquareError.png';
import splitingModel from './images/SplitingModel802020.png';
import validationRMSE from './images/ValidationRMSE.png';
import dataCleaning from './images/filterDataset.png';
import mergeDatasets from './images/mergeDatasets.png';
import missingValues from './images/MissingValues.png';
import accuracyScore from './images/accuracyScore.png';
import confusionMatrix from './images/ConfusionMatrix.png';
import importance from './images/importance.png';
import f1Score from './images/F1_curve.png';
import pScore from './images/P_curve.png';
import rScore from './images/R_curve.png';
import importRoboflow from './images/importFromRoboflow.png';
import traingModel from './images/trainModel.png';
>>>>>>> 1ab86ee357e74ccc130684893936eb036bc301c5

function App() {

  return (
		<BrowserRouter>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<Login />} />
				<Route path="register" element={<Register />} />

<<<<<<< HEAD
				{/* Protected Routes */}
				<Route
					path="main"
					element={
						<PrivateRoute>
							<Main />
						</PrivateRoute>
					}
				/>
				<Route
					path="addUser"
					element={
						<PrivateRoute>
							<AddUser />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
=======
      <main>
			<section className="main-section">
				<section id="profile" className="profile-section">
					{/* <img src={faceshot} alt="Profile" className="profile-image" /> */}
					<div className="profile-content">
						<h1 className="welcome-message">Welcome</h1>
						<p className="job-description">
							Hi, my name is Tomas Smitas. I am a Full Stack Software Developer & Data Scientist.
						</p>
						<p className="job-description">
								<a 
										href="#intro" 
										className="scroll-link" 
										id="scroll-link" 
										onClick={(e) => scrollToSection(e, 'intro')} // Call the scroll function with 'intro'
								>
										Scroll down for more
								</a>
						</p>
					</div>
				</section>
        <section id="intro">
					<h2>About Me</h2>
          <p>
            For me, the core of software development is functionality. I value simplicity and clarity, focusing on creating both 
            intuitive frontends and efficient backends. My goal is to develop solutions that effectively address real-world problems 
            and enhance user experiences.
          </p>
          <p>
            I am particularly passionate about artificial intelligence and its potential to drive innovation. I am dedicated to 
            applying AI to tackle complex challenges and improve technological solutions. By blending my technical skills with a 
            strong interest in AI, I aim to contribute to meaningful advancements and create impactful, practical applications.
          </p>
          <p>
          I hold a Level 7 Ordinary Degree in Software Development with a 2.1 GPA, granted by South East Technological University. 
          I am currently pursuing a Level 8 Honours Degree in Software Development, with the goal of achieving a 1.1 GPA.
          </p>
        </section>
        <section id="experience">
          <h2>Experience</h2>
          <div class="job">
              <h3>Netwatch – Research & Development Department (Software Development Intern)</h3>
              <p class="dates">Jan 2024 – July 2024</p>
              <ul>
                  <li>Contributed to the development of software solutions across web pages, mobile apps (Android and iOS), and in-house applications within a Scrum framework.</li>
                  <li>Performed coding, debugging, and testing applications, collaborating closely with senior developers.</li>
                  <li>Gained extensive knowledge in areas such as Azure DevOps, Git, Visual Studio, Visual Studio Code, React, Typescript, C#, Team Coding, GraphQL, SQL, Packages, Libraries, Test Cases, Mobile Applications, etc.</li>
                  <li>Implemented new features and resolved bugs and defects in existing software, improving user experience.</li>
                  <li>Participated in team meetings like Sprint Planning, Daily Stand Up, Weekly Stand Up, Planning Poker, Peer Reviews, Team Days Out, etc.</li>
                  <li>Contributed to documentation and user manuals, aiding in the understanding of React's Material React Tables V2 for developers that haven’t worked on MRT before.</li>
              </ul>
          </div>

          <div class="job">
              <h3>Integer – Medical Manufacturing (General Operative)</h3>
              <p class="dates">Sept 2018 – Jan 2024</p>
              <ul>
                  <li>Worked in multiple departments on assembly lines with team sizes of 4 to 8 to produce life-saving equipment that was subject to very high-quality standards.</li>
                  <li>Worked on the module which is a big machine that needs to be constantly maintained. My tasks included cutting coils to length, loading machine, maintaining loaders, maintaining welders, lasering, preventative maintenance, inspecting welds, and reworking or disposing of defective guides.</li>
                  <li>Operated and maintained precision manufacturing equipment, ensuring adherence to strict quality standards.</li>
                  <li>Collaborated with cross-functional teams to meet production targets, contributing to the timely delivery of medical devices.</li>
                  <li>Conducted quality inspections and tests, ensuring products met regulatory compliance and specifications.</li>
                  <li>Worked with a kanban system that ensured efficiency.</li>
              </ul>
          </div>
        </section>
				<section id="machineLearning">
          <h2>Machine Learning</h2>
					<div class="machineLearning-navigation">
							<a href="#machineLearning1">Multidimensional Linear Regression</a>
							<a href="#machineLearning2">Random Forest Classifier</a>
							<a href="#machineLearning3">Naive Bayes Classifier</a>
							<a href="#machineLearning4">Convolutional Neural Networks</a>
					</div>
          <div id="machineLearning1" class="job">
						<h3>Predicting Student Final Grades Using Multidimensional Linear Regression</h3>
						
						<p><strong>Introduction</strong></p>
						<p>In this project, a dataset from DataWorld is used, containing information about students behaviors and previous academic 
							performance, to predict their final grades. The goal is to use a multidimensional linear regression model to analyse the impact
							 of various factors on students final grades. Some of these variables include study time, free time, previous grades.</p>
						
						<p><strong>Business Objectives</strong></p>
						<p>The objective of this project is to determine whether student behavior, study habits, and previous grades can be used to 
							accurately predict final grades. This information can be useful for educators, academic advisors, and students themselves 
							to understand what factors contribute to academic success.</p>
						
						<p><strong>Situation Assessment</strong></p>
						<p>The key performance indicator for this project will be the root mean square error &#40;RMSE&#41;, which will measure the 
							accuracy of the grade predictions. A lower RMSE indicates a more accurate model. Additionally, understanding the significance 
							of various input variables &#40;such as study time, social activities, and prior performance&#41; will help identify which
							 factors are most critical in predicting student success.</p>
						
							<p><strong>Tools & Technologies</strong></p>
							<ul>
								<li><strong>Excel</strong>: Used for initial data exploration and cleaning. Excel helped in understanding the structure of the 
								dataset, identifying missing values, and performing preliminary statistical analysis before deeper modeling. It was particularly 
								useful for visualising trends in the final grades (G1), (G2) and (G3).</li>
								<br></br>
								<li><strong>Python</strong>: The core programming language used to implement the linear regression model. Python allowed for
								 the integration of different libraries such as NumPy and Pandas for efficient data manipulation and analysis. It also
								  facilitated the model training and evaluation process to predict final student grades.</li>
									<br></br>
								<li><strong>NumPy</strong>: Used to handle the numerical computations needed for the linear regression model.</li>
								<br></br>
								<li><strong>Google Colab</strong>: Provided an online environment for writing and running the Python code for the linear
								 regression model. Colabs GPU support and easy access to Jupyter notebooks made it convenient to develop, experiment with,
								  and test the model without worrying about local hardware limitations.</li>
								<br></br>
								<li><strong>Pandas</strong>: Used to manage and manipulate the dataset effectively. Pandas was used to merge, clean, 
								and preprocess the data, and to select the relevant variables for the model.</li>
							</ul>
						<p><strong>Data Collection</strong></p>
						<p>The dataset used in this project was sourced from DataWorld. It is publicly accessible at the following 
							link: <a href="https://data.world/uci/student-performance" target="_blank">https://data.world/uci/student-performance</a>. 
							It consists of two files containing similar types of data, one with just under 400 records and the other with around 650 
							records. These datasets were merged to create a larger dataset with over 1,000 records and 33 variables. Out of these 33 
							variables, 10 were selected for use in the linear regression algorithm. These columns were chosen because they contain 
							continuous data, which is ideal for linear regression. The independant columns are defined in the figure below in the 
							`specified_columns` variable.</p>
						<img src={mergeDatasets} alt="merge Datasets"></img>
						
						<p><strong>Data Cleaning</strong></p>
						<p>First, the columns were selected to be used as independent variables, and the dataset was filtered to include only these 
							columns along with the dependent variable. The figure above shows the chosen variables. During my data cleaning process, I 
							looped through each column and checked for any missing values (nulls). If I found any null values, I replaced them with the 
							median of that specific column. This approach ensured that the data was complete and ready for analysis, allowing me to retain 
							important information without removing rows with missing data, keeping in mind that I have a small dataset.</p>
						<img src={dataCleaning} alt="data cleaning"></img>

						<p><strong>Data Quality Verification</strong></p>
						<p>The dataset was sourced from DataWorld, a reputable platform for high-quality datasets.
						 The dataset is relatively small, with a total size of 150 KB, making it easy to work with. DataWorld also provides a
						 discussion section where users can share insights and questions about the dataset, along with an activity tab for tracking 
						 updates and community engagement.</p>
						
						<p><strong>Model Selection</strong></p>
						<p>A linear regression model was selected due to its effectiveness and efficiency, especially given that all of our data is numeric.
							 The independent variables, including travel time, study time, failures, free time, going out, health, absences, and previous 
							 grades (G1 and G2), were utilised to predict the dependent variable, which is the final grade (G3). The model was trained using
							  a portion of the dataset, and its performance was evaluated on the remaining data using the root mean square error (RMSE) as the
								 evaluation metric.</p>

						
						<p><strong>Model Evaluation</strong></p>
						<p>After training the model, the Root Mean Square Error was calculated to assess its performance. </p>
						<img src={rootMeanSquareError} alt="Root Mean Square Error"></img>
						<p>The calculated RMSE indicates that the predictions were relatively accurate, with an average error of approximately 1.56 . When 
							taking into context that the final grade ranges from 0 to 15 an average devaition of 1.56 is fairly accurate.</p>

						<p><strong>Results</strong></p>
						<p>The results showed that previous grades
							 &#40;G1, G2&#41; were the most significant predictors of the final grade. Other factors, such as study time and free time, 
							 had a smaller but still noticeable impact. Interestingly, social activities (going out with friends) and health 
							 status were less influential than expected, indicating that academic performance might not be as directly tied to social 
							 behavior as initially thought. </p>

						<p><strong>Validation & Testing</strong></p>
						<p>In the image below, you can see that the dataset was split into 60% for model training, 20% for validation, and 20% for testing.</p>
						<img src={splitingModel} alt="spliting model"></img>
						<p>The Root Mean Square Error (RMSE) was calculated for the validation and testing set, indicating that the model was highly accurate.</p>
						<img src={validationRMSE} alt="validation RMSE"></img>

							 
						<p><strong>Conclusion</strong></p>
						<p>This project demonstrates the power of linear regression in predicting student performance based on behavioral and academic data.
							 The findings suggest that past academic performance is the strongest predictor of future success, while other factors like study 
							 habits and free time also play a role. These insights can help educators develop targeted interventions to improve student outcomes
							  by focusing on key factors.</p>
						<p>Further improvements can be made by exploring more complex models like decision trees or random forests, which may capture 
							non-linear relationships between the variables. Additionally, incorporating more detailed data about student motivation, engagement,
							 and learning environments could improve the model's accuracy and predictive power.</p>

						<p><strong>Acknowledgements</strong></p>
						<p><a href="https://data.world/" target="_blank">DataWorld</a> - dataset collection</p>
						<p>Lecturer Dr. Greg Doyle's notes</p>
						<p><a href="https://github.com/jakevdp/PythonDataScienceHandbook/blob/master/notebooks_v1/05.06-Linear-Regression.ipynb" target="_blank">Jake Vanderplas - Python Data Science Handbook - 05.06-Linear-Regression</a></p>
						<p><a href="https://www.youtube.com/@codebasics" target="_blank">CodeBasics</a> - YouTube channel</p>

					</div><br></br><br></br>

          <div id="machineLearning2" class="job">
						<h3>Predicting The Price Of Cars Using Random Forest Classifier</h3>
						<p><strong>Introduction</strong></p>
						<p>In this project, a dataset from Kaggle is used, containing information about cars like make, year of manufacture, transmission,
							 fuel type, number of doors, engine HP, size to predict the price. A bigger dataset would 
							 have been better, but none could be obtained. This is the biggest dataset that could be sourced for this project. Using a decision 
							 tree is optimal since there is too much categorical data to do linear regression.</p>

						<p><strong>Business Objectives</strong></p>
						<p>The objective of this project is to use decision tree and random forest algorithms to predict the general price of a car. 
							The price of the car will be turned into categorical data to allow for easier understanding for the user of this data, which 
							will likely be a customers looking to buy a car. The prediction will be made on the following columns: Make, Model, Year, 
							Engine Fuel Type, Engine HP, Engine Cylinders, Transmission Type, Driven_Wheels, Number of Doors, Market Category, Vehicle Size, 
							Vehicle Style, highway MPG, city MPG, Popularity.</p>
						<p>The results from this project can help car dealerships, buyers, and businesses in the used car market to make better decisions 
							about pricing. Dealerships can use these results to set more accurate prices, while buyers can use them to find better deals.</p>

						<p><strong>Situation Assessment</strong></p>
						<p>Initially, a decision tree algorithm was used to try and predict the prices, but after revieving the results they were overfitting
						the data based on the confusion matrix results. I decided to go a step further and use a random forest algorithm to gain a more
						confident result that is less likely to overfit. The key performance indicator for this project will be the accuracy of the decision tree model, which will be evaluated
						using metrics like accuracy score and confusion matrix. A higher accuracy score indicates a more effective model in classifying car prices.</p>

						<p><strong>Tools & Technologies</strong></p>
						<ul>
								<li><strong>Excel</strong>: Used for initial data exploration and cleaning. Excel helped in understanding the structure of the 
								dataset, identifying missing values, and performing preliminary statistical analysis before deeper modeling.</li>
								<br></br>
								<li><strong>Python</strong>: The core programming language used to implement the random forest algorithm through Google Colab. 
								Python allowed for the integration of different libraries such as NumPy and Pandas for efficient data manipulation and analysis. 
								It also facilitated the model training and evaluation process to predict car prices.</li>
								<br></br>
								<li><strong>NumPy</strong>: Used to handle the numerical computations needed for the random forest algorithm.</li>
								<br></br>
								<li><strong>Google Colab</strong>: Provided an online environment for writing and running the Python code for the random forest
								algorithm. Colab's GPU support and easy access to Jupyter notebooks made it convenient to develop, experiment with,
								and test the model without worrying about local hardware limitations.</li>
								<br></br>
								<li><strong>Pandas</strong>: Used to manage and manipulate the dataset effectively. Pandas was used to merge, clean, 
								and preprocess the data, and to select the relevant variables for the model.</li>
								<br></br>
								<li><strong>sklearn</strong>: Used for implementing the machine learning pipeline and training the random forest classifier.
								sklearn provided essential tools for splitting the dataset, preprocessing the data, training the model, and evaluating its
								performance using metrics like accuracy score and the confusion matrix.</li>
								<br></br>
								<li><strong>Confusion Matrix</strong>: 
								Used to evaluate the performance of the random forest model by comparing actual and predicted categories. The confusion 
								matrix provided insight into how well the model performed in terms of true positives, true negatives, false positives, and 
								false negatives.</li>
								<br></br>
								<li><strong>Accuracy Score</strong>: A metric used to quantify the overall performance of 
								the random forest model. The accuracy score helped assess the percentage of correct predictions out of the total predictions 
								made, providing a straightforward measure of the model's effectiveness.</li>
						</ul>

						<p><strong>Data Collection</strong></p>
						<p>The dataset used in this project was sourced from Kaggle. The dataset holds just about 12,000 values. Initially, a government site was looked at for bigger and unfiltered 
						datasets, but there was no dataset available that fit my needs. The biggest dataset that could be found to predict my target was 
						sourced from Kaggle. It is publicly accessible at the following 
						link: <a href="https://www.kaggle.com/datasets/CooperUnion/cardataset" target="_blank">Kaggle</a>.
						It holds the following columns: Make, Model, Year, 
						Engine Fuel Type, Engine HP, Engine Cylinders, Transmission Type, Driven_Wheels, Number of Doors, Market Category, Vehicle Size, 
						Vehicle Style, highway MPG, city MPG, Popularity, and MSRP. After going through all of the columns, it was determined that all of
						these could be used for predicting the price. Some of the columns would have a higher impact while others not as much.
						</p>

						<p><strong>Data Cleaning</strong></p>
						<p>The first step taken for data cleaning was getting rid of the rows that had null values, as the random forest 
						algorithm could not be used on null values. A Jupyter notebook was used to loop through each row and evaluate any rows that had
						missing values. The figure below shows the missing values in each variable. After assessing the situation and realising that removing
						nearly 4,000 rows was not an option, a closer look was taken into the 'Market Category' column. After assessing this column, a decision 
						was made to remove it because it was unlikely to have a big impact on the price prediction result. This column was removed from
						the dataset, and the rows with null values were also removed. This returned a dataset that was complete with values.</p>
						<img src={missingValues} alt="data cleaning"></img>

						<p><strong>Data Quality Verification</strong></p> 
						<p>The dataset was sourced from Kaggle, a reputable platform for 
						high-quality datasets. The dataset is the largest found for my intended prediction. Kaggle provides a collaborative environment
						where users share insights, solutions, and improvements, which further enhances the reliability and usability of the datasets.</p>

						<p><strong>Model Selection</strong></p> 
						<p>Initially, a decision tree algorithm was applied to the dataset to predict car 
						MSRP categories. While the decision tree provided a reasonable baseline with acceptable predictions, it was prone 
						to overfitting, limiting its generalisation to unseen data. To address this, I selected a random forest algorithm. 
						Random forests reduce overfitting by averaging the predictions across multiple trees, making them more robust and accurate. This approach significantly improved the 
						model's performance and ensured better reliability in predicting car price categories.</p>
						
						<p><strong>Model Evaluation</strong></p>
						<p>After training the model, the accuracy score and the confusion matrix were calculated and represented to assess its performance.
							See figures below. </p>
						<img src={accuracyScore} alt="Accuracy Score"></img>
						<p>In the figure we can see that the F1 accuracy score is 92% which is fairly high. This means that 92% of predictions are correct. </p>
						<img src={confusionMatrix} alt="Confusion Matrix"></img>
						<p>The confusion matrix shows us how the true values plot against the predicted. It helps us determine if the false/true predictions are leaning
							a certain direction which can be crutial in areas such as illness predictions. For example a false prediction that should be true for
							someone that is sick is much worse than a true prediction that should be false. Since the person that is actually sick may not get the
							treatment in time while the person that is not actually sick will likely just waste a bit of time.</p>

						<p><strong>Results</strong></p>
						<p>The model achieved 92% accuracy in classifying cars into MSRP categories. Features such as 'Year', 'Engine HP', and 'Engine Fuel' 
							contributed to the predictions, while variables like 'Popularity' had less impact. The results highlight the model’s ability to 
							make reliable predictions across diverse car features. In the figure below, we can see that 'Year' had the largest impact with 
							14% importance.</p>
						<img src={importance} alt="Importance"></img>

						<p><strong>Conclusion</strong></p>
						<p>This project showcases the effectiveness of the Random Forest algorithm in predicting car MSRP categories based on various 
							features such as engine power, fuel type, and vehicle specifications. The results indicate that key attributes like 'Engine HP' 
							and 'Year' have a significant impact on the predictions, while others, such as specific car models, have less influence. 
							These insights can guide automotive companies in pricing strategies and provide valuable information for consumers making 
							purchasing decisions.</p>

						<p><strong>Acknowledgements</strong></p>
						<p><a href="https://www.kaggle.com/datasets/CooperUnion/cardataset" target="_blank">Kaggle</a> - dataset collection</p>
						<p>Lecturer Dr. Greg Doyle's notes</p>
						<p><a href="https://github.com/jakevdp/PythonDataScienceHandbook/blob/master/notebooks_v1/05.08-Random-Forests.ipynb" target="_blank">Jake Vanderplas - Python Data Science Handbook - 05.08-Random-Forests</a></p>
						
						
          </div>

					<div id="machineLearning3" class="job">

					<h3>Spam email detection using Naive Bayes Classifier (NBC)</h3>
						<p><strong>Problem Definition</strong></p>
						<p>There is an ever increasing challenge with the amount of time spent looking through spam emails, often uncertain about whether they 
							are spam or not. This becomes a significant time drain, especially for organisations with many employees. If these spam emails 
							can be accurately detected and automatically directed to the spam folder, it would save users a considerable amount of time. 
							However, it's crucial to consider that mistakenly classifying important emails as spam could have critical consequences, 
							particularly for certain companies where timely communication is essential.
						</p>

						<p><strong>Business Objectives</strong></p>
						<p>The objective of this project is to develop an automated email spam detection model. 
							The model aims to accurately classify emails as either spam or non-spam, reducing the time employees spend manually 
							filtering through their inboxes. By implementing this solution, the organisation can enhance productivity, improve email 
							security, and ensure important communications are not mistakenly filtered out. Ultimately, the goal is to create a seamless, 
							efficient email management system that minimises distractions and safeguards against potential threats.</p>

						<p><strong>Situation Assessment</strong></p>
						<p>Traditional methods of filtering spam emails often rely on manual inspection or rule-based systems, which can be inefficient and prone to inaccuracies. Using the Naive Bayes Classifier offers a scalable and automated solution for spam detection. The algorithm’s simplicity, efficiency, and effectiveness make it well-suited for classifying emails in real-time. The performance of the system is evaluated using metrics such as accuracy, precision, recall, and F1-score to measure its ability to distinguish between spam and non-spam emails accurately.</p>

						<p><strong>Tools & Technologies</strong></p>
						<ul>
								<li><strong>Scikit-learn</strong>: Provides tools for building and training the model and evaluating its performance 
								through metrics and cross-validation.</li>
								<br></br>
								<li><strong>Pandas and NumPy</strong>: Used for data manipulation, preprocessing, and feature extraction from email datasets.</li>
								<br></br>
								<li><strong>Google Colab</strong>: Offers a cloud-based environment with computational resources for training and testing 
								the model, allowing for easy experimentation and optimization.</li>
								<br></br>
								<li><strong>Python</strong>: The programming language used to integrate all components, enabling efficient preprocessing, 
								modeling, and evaluation.</li>
								<br></br>
						</ul>

						<p><strong>Data Collection</strong></p>
						<p>The dataset used for training the spam email detection model was sourced from the UCI Machine Learning Repository, 
							a well-known resource for machine learning datasets. It contains thousands of labeled emails categorised as spam or non-spam. 
							The dataset includes features such as word frequency, character frequency, and metadata, providing a robust foundation for 
							training the model.</p>

						<p>The dataset was pre-processed to ensure consistency and accuracy, including handling missing values, removing duplicates, 
							and standardising text. It was then divided into training, validation, and testing sets, with a 70/20/10 split, 
							to facilitate effective model evaluation and prevent overfitting.</p>

						<p><strong>Data Quality Verification</strong></p>
						<p>The dataset was verified through visualisation of annotations. The training process was monitored to ensure the model was 
							learning effectively, and sample predictions were manually reviewed to confirm detection accuracy.</p>

						<p><strong>Model Selection</strong></p>
						<p>The Naive Bayes Classifier (NBC) was selected for its simplicity, efficiency, and effectiveness in text classification tasks. 
							NBC uses a probabilistic approach based on Bayes theorem, making it particularly suitable for spam email detection. </p>

						<p><strong>Data Cleaning</strong></p>
						<p>Data cleaning involved handling missing or inconsistent values, removing duplicate emails, and correcting mislabeled entries. 
							The correlation between the target variable and the independent variables was analysed. Since the dataset contains over 
							50 columns, those with minimal to no correlation were removed. This step ensures that irrelevant columns do not interfere 
							with achieving accurate results.</p>

						<p><strong>Model Training</strong></p> <p>The annotated dataset was imported from Roboflow with the following code.</p>
						<img src={importRoboflow} alt="RoboFlow Import"></img>
						<p> Roboflow was used to annotate images and export the dataset in a format compatible with the YOLOv11 model.</p> 
						<p>The training process was conducted using Google Colab, leveraging its GPU support to accelerate computations. 
							To balance training quality and time constraints, the model was trained for 15 epochs. This duration was chosen due to the 
							computational intensity required for processing the dataset. Training at 15 epochs took just over 2 hours.</p> 
						<p>The training utilised the Ultralytics framework, which simplifies object detection model training. 
							First, a pretrained model from Ultralytics was loaded as a starting point. This approach allowed the model to leverage 
							features learned from a large generic dataset, speeding up convergence and improving accuracy. 
							Subsequently, a new model was trained on the annotated dataset, ensuring it was fine-tuned to detect helmets and no helmets.
							See image below for the code example.</p>
						<img src={traingModel} alt="Training Model"></img>

						<p><strong>Model Evaluation</strong></p>
						<p>After training the model, its performance was evaluated using F1-score, recall, and precision metrics. See the figures below 
							for detailed results.</p>
						<img src={f1Score} alt="F1" class="responsive-img"></img>
						<p>The F1-score achieved was 93%, indicating the model's high reliability in detecting helmets and no helmets. 
							This means that 93% of predictions were correct.</p>
						<img src={pScore} alt="Precision" class="responsive-img"></img>
						<p>The precision-confidence curve for the helmet detection project shows that all classes achieve a precision of 1.00 at a 
							confidence threshold of 0.907. This means that when the model predicts with at least 90.7% confidence, it makes no false 
							positive detections, ensuring highly reliable predictions for safety equipment detection at higher confidence levels.</p>
						<img src={rScore} alt="Recall" class="responsive-img"></img>
						<p>The recall-confidence curve for the helmet detection project shows that all classes achieve a recall of 0.99 at a confidence 
							threshold of 0.0. This indicates that the model successfully detects 99% of all actual instances across all classes, 
							even when it predicts with very low confidence, highlighting its effectiveness in minimising missed detections.</p>

						<p><strong>Results</strong></p>
						<p>The model demonstrated high accuracy in detecting helmets and no helmets in diverse environments. Features such as lighting 
							conditions and worker positions impacted detection performance, while robust preprocessing techniques mitigated these challenges. 
							The results affirm the system’s capability to monitor safety effectively.</p>

						<p><strong>Conclusion</strong></p>
						<p>This project highlights the potential of Ultralytics, YOLO and OpenCV in real-time object detection for enhancing safety. 
							The system successfully identified safety violations with high accuracy, providing a reliable tool for supervisors and 
							safety officers. This innovation can significantly reduce workplace accidents, ensuring a safer environment for workers.</p>

						<p><strong>Acknowledgements</strong></p>
						<p><a href="https://ultralytics.com/" target="_blank">Ultralytics</a> - Documentation, Tutorials, Guides, Framework, Support</p>
						<p><a href="https://app.roboflow.com/" target="_blank">Roboflow</a> - Dataset annotation and preparation</p>
						<p><a href="https://opencv.org/" target="_blank">OpenCV</a> - Video stream processing</p>
						<p>Lecturer Dr. Greg Doyle's notes</p>

					</div>


					<div id="machineLearning4" class="job">

					<h3>Object Detection For Helmets Using Convolutional Neural Networks (CNNs)</h3>
						<p><strong>Introduction</strong></p>
						<p>This project focuses on using object detection algorithm (CNNs) to detect helmets. The YOLO (You Only Look Once) model, 
							implemented with the Ultralytics library, is used in conjunction with OpenCV for real-time video processing. 
							The dataset was sourced from public repositories and  was preannotated on Roboflow. The annotations were revised to optimise 
							the model.</p>

						<p><strong>Business Objectives</strong></p>
						<p>The primary goal of this project is to improve safety by detecting helmets and no helmets. Using YOLO and OpenCV, the model detects whether 
							people are wearing helmets in real-time video feeds. This can prevent accidents, ensure compliance with safety regulations, 
							and minimise workplace hazards.</p>

						<p>The system’s results can be used by construction managers, safety officers, insurance companies and many others to enhance 
							safety protocols, reduce liability, and improve worker protection.</p>

						<p><strong>Situation Assessment</strong></p>
						<p>Traditional methods of monitoring safety often rely on manual observation, which can be time-consuming and 
							prone to human error. Using YOLO for object detection offers a scalable and automated solution. YOLO’s fast inference and accuracy 
							are critical for real-time applications, and OpenCV ensures efficient video processing. The performance of the system is 
							evaluated using metrics such as precision, recall, and F1-score to measure its effectiveness in detecting helmet violations.</p>

						<p><strong>Tools & Technologies</strong></p>
						<ul>
								<li><strong>Ultralytics YOLO</strong>: Used for implementing  the object detection model. The Ultralytics library simplifies 
								the integration of YOLO models.</li>
								<br></br>
								<li><strong>OpenCV</strong>: Facilitates real-time video stream processing and visualisation. OpenCV is critical for 
								preprocessing video input and displaying detection results.</li>
								<br></br>
								<li><strong>Google Colab</strong>: Provides an environment with GPU support for training the YOLO model. 
								Colab’s cloud infrastructure enables quick experimentation and model optimisation without requiring local resources.</li>
								<br></br>
								<li><strong>Python</strong>: The programming language used to build the system, combining YOLO and OpenCV.</li>
								<br></br>
						</ul>

						<p><strong>Data Collection</strong></p>
						<p>The dataset used for training the model was sourced from Roboflows publicly available repositories. It contains just over
							7000 of annotated images with class's for helmets and noHelmets. The dataset was augmented to improve the model by implemeting the following 
							augmentations: Rotations, Crops, Grayscale and Blur.</p>
						
						<p>The images were already annotated but they were checked over and adjusted to ensure accurate labeling. The dataset was divided 
							into training, validation, and testing sets, with a 70/20/10 split for effective model evaluation.</p>

						<p><strong>Data Cleaning</strong></p>
						<p>Data cleaning involved ensuring consistent annotations and removing duplicates or mislabeled images. Images with poor visibility 
							or low resolution were excluded to maintain data quality. </p>

						<p><strong>Data Quality Verification</strong></p>
						<p>The dataset was verified through visualisation of annotations. The training process was monitored to ensure the model was 
							learning effectively, and sample predictions were manually reviewed to confirm detection accuracy.</p>

						<p><strong>Model Selection</strong></p>
						<p>The YOLOv11 model from the Ultralytics library was selected for its high speed and accuracy in object detection tasks, 
							it is the latest model of YOLO. YOLO's one-stage detection framework allows real-time processing, which is critical for 
							live video analysis.</p>

						<p><strong>Model Training</strong></p> <p>The annotated dataset was imported from Roboflow with the following code.</p>
						<img src={importRoboflow} alt="RoboFlow Import"></img>
						<p> Roboflow was used to annotate images and export the dataset in a format compatible with the YOLOv11 model.</p> 
						<p>The training process was conducted using Google Colab, leveraging its GPU support to accelerate computations. 
							To balance training quality and time constraints, the model was trained for 15 epochs. This duration was chosen due to the 
							computational intensity required for processing the dataset. Training at 15 epochs took just over 2 hours.</p> 
						<p>The training utilised the Ultralytics framework, which simplifies object detection model training. 
							First, a pretrained model from Ultralytics was loaded as a starting point. This approach allowed the model to leverage 
							features learned from a large generic dataset, speeding up convergence and improving accuracy. 
							Subsequently, a new model was trained on the annotated dataset, ensuring it was fine-tuned to detect helmets and no helmets.
							See image below for the code example.</p>
						<img src={traingModel} alt="Training Model"></img>

						<p><strong>Model Evaluation</strong></p>
						<p>After training the model, its performance was evaluated using F1-score, recall, and precision metrics. See the figures below 
							for detailed results.</p>
						<img src={f1Score} alt="F1" class="responsive-img"></img>
						<p>The F1-score achieved was 93%, indicating the model's high reliability in detecting helmets and no helmets. 
							This means that 93% of predictions were correct.</p>
						<img src={pScore} alt="Precision" class="responsive-img"></img>
						<p>The precision-confidence curve for the helmet detection project shows that all classes achieve a precision of 1.00 at a 
							confidence threshold of 0.907. This means that when the model predicts with at least 90.7% confidence, it makes no false 
							positive detections, ensuring highly reliable predictions for safety equipment detection at higher confidence levels.</p>
						<img src={rScore} alt="Recall" class="responsive-img"></img>
						<p>The recall-confidence curve for the helmet detection project shows that all classes achieve a recall of 0.99 at a confidence 
							threshold of 0.0. This indicates that the model successfully detects 99% of all actual instances across all classes, 
							even when it predicts with very low confidence, highlighting its effectiveness in minimising missed detections.</p>

						<p><strong>Results</strong></p>
						<p>The model demonstrated high accuracy in detecting helmets and no helmets in diverse environments. Features such as lighting 
							conditions and worker positions impacted detection performance, while robust preprocessing techniques mitigated these challenges. 
							The results affirm the system’s capability to monitor safety effectively.</p>

						<p><strong>Conclusion</strong></p>
						<p>This project highlights the potential of Ultralytics, YOLO and OpenCV in real-time object detection for enhancing safety. 
							The system successfully identified safety violations with high accuracy, providing a reliable tool for supervisors and 
							safety officers. This innovation can significantly reduce workplace accidents, ensuring a safer environment for workers.</p>

						<p><strong>Acknowledgements</strong></p>
						<p><a href="https://ultralytics.com/" target="_blank">Ultralytics</a> - Documentation, Tutorials, Guides, Framework, Support</p>
						<p><a href="https://app.roboflow.com/" target="_blank">Roboflow</a> - Dataset annotation and preparation</p>
						<p><a href="https://opencv.org/" target="_blank">OpenCV</a> - Video stream processing</p>
						<p>Lecturer Dr. Greg Doyle's notes</p>

					</div>



        </section>
        <section id="projects">
          <h2>Projects</h2>

          <div class="project">
            <h3>Portfolio Website – Web Development</h3>
            <p><strong>Technologies:</strong> React, JavaScript, HTML, CSS</p>
            <p>This portfolio website showcases my projects and skills in software development. It is built using React, JavaScript, HTML, 
              CSS to provide an interactive and responsive experience. The site features a clean, modern design with sections for my experience, 
              projects, and contact information. It also includes links to live project demos and detailed descriptions of each project, 
              allowing visitors to explore my work and get in touch with me.</p>
          </div>

          <div class="project">
            <h3>Swimmer Performance Tracker – Cloud Development</h3>
            <p><strong>Technologies:</strong> Python</p>
            <p>In this project, I developed a Swimming Performance Tracker application using Python. The app connects to a database hosted on PythonAnywhere, where it retrieves data on swimmers' times and the types of swims. Using this data, the application dynamically renders a user-friendly interface that allows swimmers and coaches to visualise performance trends over time. The core feature is a chart that plots the swimmers' times against the type of swim, providing valuable insights into their progress and areas that need improvement.</p>
            <p>Check it out at: <a href="https://c00276177.pythonanywhere.com/" target="_blank">https://c00276177.pythonanywhere.com/</a></p>
          </div>

          <div class="project">
              <h3>Website API – Web Development</h3>
              <p><strong>Technologies:</strong> PHP, JavaScript, CSS</p>
              <p>In this project, an employee can log in and add, view, amend, delete, and fully manage personal data. I used the Plesk API to access and manipulate the database tables.</p>
          </div>

          <div class="project">
              <h3>Sales System – Object-Oriented Programming</h3>
              <p><strong>Technologies:</strong> Java, MySQL Workbench</p>
              <p>In this project, I created a system to manage customers using a Java GUI that retrieves data from an updatable database. The user can create, retrieve, update, and delete data as required.</p>
          </div>

          <div class="project">
              <h3>Endless Runner Game – Computer Architecture</h3>
              <p><strong>Technologies:</strong> Assembly</p>
              <p>This game leverages assembly language to create an engaging endless runner experience. It features multiple levels with increasing difficulty, background music, and special effect sounds to enhance gameplay. Key elements include a random number generator, scoring system, lives, a collision detector, and vibrant colors. The game combines these components to offer a challenging and immersive gaming experience.</p>

              <div class="image-gallery">
                  <div class="image-item">
                      <img src={level1Assembly} alt="Level 1 of Endless Runner Game"></img>
                      <p><strong>Level 1:</strong> The initial level features a character on the left side of the screen that can be moved up and down to avoid obstacles moving from right to left.</p>
                  </div>

                  <div class="image-item">
                      <img src={level2Assembly} alt="Level 2 of Endless Runner Game"></img>
                      <p><strong>Level 2:</strong> In this level, a box that changes size obstructs the view of the moving obstacles, and the speed of the obstacles increases, adding to the challenge.</p>
                  </div>

                  <div class="image-item">
                      <img src={codeAssembly} alt="Code Snippet for Sound Initialization"></img>
                      <p><strong>Code Snippet:</strong> This snippet shows the initialization of sound and other essential elements in the game, providing insights into the underlying code that enhances the gameplay experience.</p>
                  </div>
              </div>
          </div>

          <div class="project">
              <h3>Undertakers Website – Team Project</h3>
              <p><strong>Technologies:</strong> PHP, JavaScript, CSS</p>
              <p>In this team project, we developed a website for an undertaker business that allows users to add customers, manage details, create invoices, calculate payments, list customers, and list invoices among other features.</p>
          </div>

          <div class="project">
              <h3>Self-Checkout System – System Analysis</h3>
              <p><strong>Technologies:</strong> System Analysis</p>
              <p>In this analysis, I created sequence diagrams, class diagrams, use case diagrams, and test cases for the self-checkout system.</p>
          </div>
        </section>
			</section>
      </main>
      <footer>
        <section id="contact">
        <p>Contact Information:</p>
        <p>Email: <a href="mailto:tomassmitas@yahoo.com">tomassmitas@yahoo.com</a></p>
        <p>Phone: 083 358 8363</p>
        <div className="social-media-linear">
          <a href="https://github.com/C00276177Tomas" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" className="social-logo-linear" />
          </a>
          <a href="https://www.linkedin.com/in/tomas-smitas-a43aa2104/" target="_blank" rel="noopener noreferrer">
            <img src={linkedInLogo} alt="GitHub" className="social-logo-linear" />
          </a>
        </div>
        </section>
      </footer>
    </div>
>>>>>>> 1ab86ee357e74ccc130684893936eb036bc301c5
  );
}

export default App;