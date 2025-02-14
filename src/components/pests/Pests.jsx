import React, { useState } from "react";
import { Box, Button, Typography, Paper, Container } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Pests = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // 여기에 실제 API 호출 로직이 들어갈 수 있습니다
      // 예시로 setTimeout을 사용하여 가짜 결과를 보여줍니다
      setTimeout(() => {
        setResult({
          status: "diseased",
          disease: "잎마름병",
          confidence: 95.8,
          recommendation: "살균제 처리가 필요합니다.",
        });
      }, 1500);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          작물 병충해 진단
        </Typography>

        <Paper
          sx={{
            p: 3,
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 3 }}
            >
              이미지 업로드
            </Button>
          </label>

          {selectedImage && (
            <Box sx={{ mt: 2, width: "100%", maxWidth: 500 }}>
              <img
                src={selectedImage}
                alt="선택된 이미지"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}

          {result && (
            <Box sx={{ mt: 3, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                진단 결과
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: result.status === "healthy" ? "#e8f5e9" : "#ffebee",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  상태: {result.status === "healthy" ? "정상" : "병충해 감지"}
                </Typography>
                {result.status === "diseased" && (
                  <>
                    <Typography variant="body1" gutterBottom>
                      진단된 병명: {result.disease}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      신뢰도: {result.confidence}%
                    </Typography>
                    <Typography variant="body1">
                      권장 조치: {result.recommendation}
                    </Typography>
                  </>
                )}
              </Paper>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Pests;
