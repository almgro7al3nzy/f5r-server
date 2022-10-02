package client;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Pane;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import java.util.regex.Pattern;

public class ChatTalk extends Application {
	private static Label username_label;
	private static TextField username_field;
	private static Label hostname_label;
	private static TextField hostname_field;
	private static Label port_label;
	private static TextField port_field;
	private static Button login_button;
	private static Label chattalk_heading;
	private static Stage stage;

	@Override
	public void start(Stage primaryStage) {
		stage = primaryStage;

		Pane root = new Pane();
		root.setStyle("-fx-background-color: #7d93db");

		Scene scene = new Scene(root, 300, 400);
		scene.getStylesheets().add("Res/Stylesheet.css");

		username_label = new Label("Username: ");
		username_label.setLayoutX(50);
		username_label.setLayoutY(100);
		root.getChildren().add(username_label);

		username_field = new TextField();
		username_field.setLayoutX(120);
		username_field.setLayoutY(97);
		root.getChildren().add(username_field);

		hostname_label = new Label("Hostname: ");
		hostname_label.setLayoutX(50);
		hostname_label.setLayoutY(150);
		root.getChildren().add(hostname_label);

		hostname_field = new TextField("localhost");
		hostname_field.setLayoutX(120);
		hostname_field.setLayoutY(147);
		root.getChildren().add(hostname_field);

		port_label = new Label("Port: ");
		port_label.setLayoutX(85);
		port_label.setLayoutY(200);
		root.getChildren().add(port_label);

		port_field = new TextField();
		port_field.setLayoutX(120);
		port_field.setLayoutY(197);
		root.getChildren().add(port_field);

		login_button = new Button();
		login_button.setLayoutX(50);
		login_button.setLayoutY(250);
		login_button.setText("Connect To ChatTalk");
		login_button.setPrefSize(225, 25);
		root.getChildren().add(login_button);

		chattalk_heading = new Label("ChatTalk");
		chattalk_heading.setLayoutX(50);
		chattalk_heading.setLayoutY(15);
		chattalk_heading.setFont(new Font(45));
		root.getChildren().add(chattalk_heading);

		Label error_label = new Label("");
		error_label.setLayoutX(50);
		error_label.setLayoutY(350);
		root.getChildren().add(error_label);

		primaryStage.setTitle("ChatTalk by Gaurav and Akshay");
		primaryStage.setScene(scene);
		primaryStage.setResizable(false);
		primaryStage.show();

		root.setOnKeyPressed(new EventHandler<KeyEvent>()
		{
			@Override
			public void handle(KeyEvent key){
				error_label.setText("");
				if (key.getCode().equals(KeyCode.ENTER))
				{
					if(Pattern.matches("[0-9]{4}",port_field.getText()))
						connect();
					else
						error_label.setText("Invalid port number");
				}
			}
		});

		login_button.setOnAction(new EventHandler<ActionEvent>() {
			@Override public void handle(ActionEvent e) {
				error_label.setText("");
				if(Pattern.matches("[0-9]{4}",port_field.getText()))
					connect();
				else
					error_label.setText("Invalid port number");
			}
		});
	}
	public static void connect(){
		stage.hide();
		Client client = new Client(hostname_field.getText(), Integer.parseInt(port_field.getText()), username_field.getText());
		Thread x = new Thread(client);
		Client_GUI gui = new Client_GUI(hostname_field.getText(), Integer.parseInt(port_field.getText()), username_field.getText(), client);
		client.setGUI(gui);
		try {
			gui.start(new Stage());
		} catch (Exception e1) {

			e1.printStackTrace();
		}
		x.start();
	}

	public static void main(String[] args) {
		launch(args);
	}
}