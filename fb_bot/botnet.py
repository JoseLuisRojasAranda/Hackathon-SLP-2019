from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import sys
import subprocess
from flask import Flask, jsonify
from flask import request

app = Flask(__name__)

# Replace below path with the absolute path
# to chromedriver in your computer
driver = webdriver.Chrome('./chromedriver')


# Replace 'Friend's Name' with the name of your friend 
# or the name of a group 
@app.route("/")
def test():

    target = '"Diego Perez"'

    # Replace the below string with your own message
    string = "Detectamos un intruso."

    x_arg = '//span[contains(@title,' + target + ')]'
    group_title = wait.until(EC.presence_of_element_located((
        By.XPATH, x_arg)))
    group_title.click()

    time.sleep(1)

    message = driver.find_elements_by_xpath('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]')[0]
    subprocess.run(["osascript", "-e", 'tell application "System Events" to keystroke "v" using command down'])

    time.sleep(3)
    subprocess.run(["osascript", "-e", 'tell application "System Events" to key code 36'])
    time.sleep(1)
 
    message.send_keys(string)

    sendbutton = driver.find_elements_by_xpath('//*[@id="main"]/footer/div[1]/div[3]/button')[0]
    sendbutton.click()
    #subprocess.run(["osascript", "-e", 'tell application "System Events" to keystroke "enter" using command down'])

    #sendbutton = driver.find_elements_by_xpath('//*[@id="main"]/footer/div[1]/div[3]/button')[0]
    #sendbutton.click()


    #driver.close()

    return "ahuevo"

if __name__ == "__main__":
    driver.get("https://web.whatsapp.com/")
    wait = WebDriverWait(driver, 600)
    time.sleep(15)
    app.run(host="0.0.0.0", port=3006, debug=True)
    print("SERVER RUNNING")

