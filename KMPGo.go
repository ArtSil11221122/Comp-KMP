// Knuth-Morris-Pratt
func computeLPS(pattern string) []int {
	length := len(pattern)
	lps := make([]int, length)
	l := 0
	i := 1
	for i < length {
		if pattern[i] == pattern[l] {
			l++
			lps[i] = l
			i++
		} else {
			if l != 0 {
				l = lps[l-1]
			} else {
				lps[i] = 0
				i++
			}
		}
	}
	return lps
}
func KMP(text string, pattern string) []string {
	n := len(text)
	m := len(pattern)
	lps := computeLPS(pattern)
	result := []string{}
	i := 0
	j := 0
	for i < n {
		if pattern[j] == text[i] {
			i++
			j++
		}
		if j == m {
			startIndex := int(math.Max(float64(i-j-100), 0))
			endIndex := int(math.Min(float64(i+100), float64(n)))
			match := text[startIndex:endIndex]
			result = append(result, match)
			j = lps[j-1]
		} else if i < n && pattern[j] != text[i] {
			if j != 0 {
				j = lps[j-1]
			} else {
				i++
			}
		}
	}
	return result
}